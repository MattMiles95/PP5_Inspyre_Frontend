//React
import React, { useState } from "react";

// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ReplyForm = ({ parentId, postId, setComments, setShowReplyForm }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        results: prev.results.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), data],
              }
            : comment
        ),
      }));

      setContent("");
      setShowReplyForm(false);
    } catch (err) {
      console.error(
        "Reply submission error:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-2">
      <Form.Group controlId="replyContent">
        <Form.Control
          as="textarea"
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a reply..."
        />
      </Form.Group>
      <Button variant="primary" type="submit" size="sm" className="mt-1">
        Post Reply
      </Button>
    </Form>
  );
};

export default ReplyForm;
