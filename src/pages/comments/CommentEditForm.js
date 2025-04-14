// React
import React, { useState } from "react";

// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Form from "react-bootstrap/Form";

// CSS
import styles from "../../styles/CommentCreateEditForm.module.css";

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
      // If we're replying, defer to the custom handler passed in
      if (isReply && customSubmit) {
        await customSubmit(trimmedContent);
        setFormContent("");
        return;
      }

      // Otherwise it's an edit
      await axiosRes.put(`/comments/${id}/`, {
        content: trimmedContent,
      });

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) =>
          comment.id === id
            ? {
                ...comment,
                content: trimmedContent,
                updated_at: "now",
              }
            : comment
        ),
      }));

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
          className={styles.Button}
          onClick={cancelCallback || (() => setShowEditForm?.(false))}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
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
