// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// CSS
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/CommentReplyForm.module.css";

// React
import React, { useState, useEffect, useRef } from "react";

const insertReply = (comments, parentId, newReply) => {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...(comment.replies || []), newReply],
      };
    }
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: insertReply(comment.replies, parentId, newReply),
      };
    }
    return comment;
  });
};

const ReplyForm = ({ parentId, postId, setComments, setShowReplyForm }) => {
  const [content, setContent] = useState("");
  const formRef = useRef(null);
  const [replying, setReplying] = useState(false);

  // Detect outside clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowReplyForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowReplyForm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setReplying(true);

    if (!content.trim()) return;

    try {
      const payload = {
        content,
        post: postId,
      };

      if (parentId) {
        payload.parent = parentId;
      }

      const { data } = await axiosRes.post("/comments/", payload);

      setComments((prev) => ({
        ...prev,
        results: insertReply(prev.results, parentId, data),
      }));

      setContent("");
      setShowReplyForm(false);
    } catch (err) {
      console.error(
        "Reply submission error:",
        err.response?.data || err.message
      );
    } finally {
      setReplying(false);
    }
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`${styles.ReplyForm} mt-2`}
    >
      <Form.Group controlId="replyContent">
        <Form.Control
          as="textarea"
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a reply..."
        />
      </Form.Group>
      <div className="d-flex justify-content-end gap-2 mt-1">
        <Button
          variant="secondary"
          type="button"
          size="sm"
          className={btnStyles.CommentBtn}
          onClick={() => setShowReplyForm(false)}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          size="sm"
          className={btnStyles.CommentBtn}
          disabled={!content.trim() || replying}
        >
          {replying ? "Replying..." : "Reply"}
        </Button>
      </div>
    </Form>
  );
};

export default ReplyForm;
