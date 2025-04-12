// React
import React, { useState } from "react";

// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

// CSS
import styles from "../../styles/PostCreateForms.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";

// Hooks
import { UseRedirect } from "../../hooks/UseRedirect";

// React Router
import { useNavigate } from "react-router-dom";

function PostTextForm({ setPostType }) {
  UseRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const { title, content, tags } = postData;

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagsChange = (e) => {
    setPostData({
      ...postData,
      tags: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      navigate(`/posts/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={`${appStyles.Content} ${styles.Container} mt-4`}>
        <Button
          variant="link"
          className={`${btnStyles.BackBtn} mb-3 p-0 text-decoration-none d-flex align-items-center`}
          onClick={() => setPostType(null)}
          aria-label="Go back to post type selection"
        >
          <i className="fas fa-arrow-left me-2"></i> Go back
        </Button>
        <Row className="mb-3">
          <Col md={{ span: 8, offset: 2 }}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
              {errors?.title?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-2">
                  {message}
                </Alert>
              ))}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={{ span: 8, offset: 2 }}>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="content"
                value={content}
                onChange={handleChange}
              />
              {errors?.content?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-2">
                  {message}
                </Alert>
              ))}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={{ span: 8, offset: 2 }}>
            <Form.Group>
              <Form.Label>Tags (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={tags}
                onChange={handleTagsChange}
                placeholder="Enter tags separated by commas"
              />
              {errors?.tags?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-2">
                  {message}
                </Alert>
              ))}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col
            md={{ span: 8, offset: 2 }}
            className="d-flex justify-content-between"
          >
            <div className="d-flex justify-content-center gap-3">
              <Button
                className={`${btnStyles.CancelBtn}`}
                onClick={() => navigate(-1)}
                aria-label="Cancel post creation"
              >
                Cancel
              </Button>
              <Button className={`${btnStyles.CreateBtn}`} type="submit">
                Create
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default PostTextForm;
