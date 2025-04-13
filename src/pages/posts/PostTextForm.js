// React
import React, { useState, useEffect } from "react";

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

// Quill Editor
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

function PostTextForm({ setPostType, postType }) {
  UseRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const { title, content, tags } = postData;

  // Quill integration
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: ["left", "center", "justify"] }],
        ["clean"], // remove formatting
      ],
    },
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setPostData((prevData) => ({
          ...prevData,
          content: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);

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
  
    const validationErrors = {};
  
    if (!title.trim()) {
      validationErrors.title = ["Don't forget to give your creation a title!"];
    }
  
    if (!content.trim()) {
      validationErrors.content = ["Uh-oh - looks like you forgot to write something!"];
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
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
          <h2 className={styles.CenteredHeading}>Written Creation</h2>
          {/* Conditionally Render Sections Based on `postType` */}
          <Col md={{ span: 12 }}>
            {postType === "text" && (
              <>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name your creation"
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

                <Form.Group>
                  <Form.Label className="mt-4">Content</Form.Label>
                  <div
                    ref={quillRef}
                    style={{
                      height: "300px",
                      backgroundColor: "#fff",
                      border: "1px solid #ced4da",
                      borderRadius: "0.25rem",
                      color: "black",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  />
                  {errors?.content?.map((message, idx) => (
                    <Alert key={idx} variant="warning" className="mt-2">
                      {message}
                    </Alert>
                  ))}
                </Form.Group>
              </>
            )}
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={{ span: 12 }}>
            <Form.Group>
              <Form.Label className="mt-2">Tags (comma-separated)</Form.Label>
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

        <Row className="mb-2">
          <Col md={{ span: 12 }} className="d-flex justify-content-between">
            <div className="d-flex justify-content-center gap-3">
              <Button
                className={btnStyles.CancelBtn}
                onClick={() => navigate(-1)}
                aria-label="Cancel post creation"
              >
                Cancel
              </Button>
              <Button
                className={`${btnStyles.CreateBtn}`}
                type="submit"
                disabled={!content.trim()}
              >
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
