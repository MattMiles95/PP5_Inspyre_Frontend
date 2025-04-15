// React
import React, { useState } from "react";

// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Form from "react-bootstrap/Form";

// CSS
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";

function CommentEditForm(props) {
  const {
    id,
    content = "", // default for replies
    setShowEditForm,
    setComments,
    approval_status,
    isReply = false,
    handleSubmit: customSubmit,
    cancelCallback,
  } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedContent = formContent?.trim();
    if (!trimmedContent) return;

    try {
      if (isReply && customSubmit) {
        await customSubmit(trimmedContent);
        setFormContent("");
        return;
      }

      await axiosRes.put(`/comments/${id}/`, {
        content: trimmedContent,
      });

      setComments((prevComments) => ({
        ...prevComments,
        results: updateCommentContent(prevComments.results, id, trimmedContent),
      }));

      const updateCommentContent = (comments, idToUpdate, newContent) => {
        return comments.map((comment) => {
          if (comment.id === idToUpdate) {
            return { ...comment, content: newContent, updated_at: "now" };
          }
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateCommentContent(
                comment.replies,
                idToUpdate,
                newContent
              ),
            };
          }
          return comment;
        });
      };

      if (setShowEditForm) {
        setShowEditForm(false);
      }
    } catch (err) {
      // Handle or log error
    }
  };

  if (approval_status === 1 && !isReply) {
    return (
      <p className={styles.Reported}>
        This comment has been reported and cannot be edited.
      </p>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={btnStyles.CommentFormBtn}
          onClick={cancelCallback || (() => setShowEditForm?.(false))}
          type="button"
        >
          cancel
        </button>
        <button
          className={btnStyles.CommentFormBtn}
          disabled={!formContent.trim()}
          type="submit"
        >
          {isReply ? "reply" : "save"}
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
