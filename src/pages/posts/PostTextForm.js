// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

// CSS
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/PostCreateForms.module.css";

// Hooks
import { useRedirect } from "../../hooks/useRedirect";

// Local Components
import Asset from "../../components/Asset";
import Modal from "../../components/Modal";
import QuillEditor from "../../components/QuillEditor";

// React
import React, { useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

function PostTextForm({ setPostType, postType }) {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
    original_author: false,
  });
  const { title, content, tags, original_author } = postData;
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postDataResponse, setPostDataResponse] = useState(null);

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setPostData({
      ...postData,
      original_author: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!title.trim()) {
      validationErrors.title = ["Don't forget to give your creation a title!"];
    }
    if (!content.trim() || content === "<p><br></p>") {
      validationErrors.content = [
        "Uh-oh - looks like you forgot to write something!",
      ];
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);
    formData.append("original_author", original_author);

    setSubmitting(true);
    try {
      const { data } = await axiosReq.post("/posts/", formData);
      setPostDataResponse(data);
      setShowModal(true);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (postDataResponse?.id) {
      navigate(`/posts/${postDataResponse.id}`);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Button
          variant="link"
          className={`${btnStyles.BackBtn} mb-3 p-0 text-decoration-none d-flex align-items-center`}
          onClick={() => setPostType(null)}
          aria-label="Go back to post type selection"
        >
          <i className={`${appStyles.BackArrow} fas fa-arrow-left me-2`}></i>
          Go back
        </Button>
        <div className="text-center mb-4">
          <h2 className={styles.CenteredHeading}>Written Creation</h2>
        </div>
        <Container
          className={`${appStyles.Content} ${styles.CreateContainer} mt-4`}
        >
          <Form.Group className="mb-3">
            <Form.Label className={styles.FormLabel}>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              className={styles.FormInput}
              placeholder="Name your creation"
            />
            {errors?.title?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-2">
                {message}
              </Alert>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={styles.FormLabel}>Content</Form.Label>
            <div>
              <QuillEditor
                content={content}
                onChange={(val) =>
                  setPostData((prev) => ({ ...prev, content: val }))
                }
              />
            </div>
            {errors?.content?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-2">
                {message}
              </Alert>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={styles.FormLabel}>
              Tags
            </Form.Label>
            <Form.Control
              type="text"
              name="tags"
              value={tags}
              onChange={handleChange}
              className={styles.FormInput}
              placeholder="Enter tags separated by commas"
            />
            {errors?.tags?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-2">
                {message}
              </Alert>
            ))}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className={styles.FormLabel}>
              A <span className={appStyles.InspyredText}>you</span> original, or
              an appreciation post? Let us know!
            </Form.Label>
            <div className={styles.OriginalAuthorCheckbox}>
              <input
                type="checkbox"
                id="original-author-checkbox"
                checked={original_author}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="original-author-checkbox"
                className={styles.OriginalAuthorLabel}
              >
                I am the original author of this work
              </label>
            </div>
          </Form.Group>

          {submitting && (
            <div className="text-center my-4">
              <Asset spinner message="Creating your post..." />
            </div>
          )}

          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button
              className={btnStyles.CancelBtn}
              onClick={() => navigate(-1)}
              aria-label="Cancel post creation"
            >
              Cancel
            </Button>
            <Button
              className={btnStyles.CreateBtn}
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </Container>
      </Form>

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Published!"
        customFooter={
          <button onClick={handleModalClose} className={btnStyles.SuccessBtn}>
            Continue to post
          </button>
        }
      >
        <p>Your post was successfully created!</p>
      </Modal>
    </>
  );
}

export default PostTextForm;
