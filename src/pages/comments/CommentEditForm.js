// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Form from "react-bootstrap/Form";

// CSS
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/CommentCreateEditForm.module.css";

// React
import React, { useState } from "react";

function CommentEditForm({
  id,
  content = "",
  setShowEditForm,
  setComments,
  approval_status,
}) {
  const [formContent, setFormContent] = useState(content);
  const [editing, setEditing] = useState(false);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEditing(true);

    const trimmedContent = formContent?.trim();
    if (!trimmedContent) return;

    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: trimmedContent,
      });

      const updateCommentContent = (comments, idToUpdate, newContent) => {
        return comments.map((comment) => {
          if (comment.id === idToUpdate) {
            return { ...comment, content: newContent, updated_at: "now" };
          }
          if (comment.replies?.length > 0) {
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

      setComments((prevComments) => ({
        ...prevComments,
        results: updateCommentContent(prevComments.results, id, trimmedContent),
      }));

      setShowEditForm?.(false);
    } catch (err) {
      // Handle or log error
    } finally {
      setEditing(false);
    }
  };

  if (approval_status === 1) {
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
          className={btnStyles.CommentBtn}
          onClick={() => setShowEditForm?.(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={btnStyles.CommentBtn}
          disabled={!formContent.trim() || editing}
          type="submit"
        >
          {editing ? "saving..." : "save"}
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
