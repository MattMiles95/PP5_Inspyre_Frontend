// API
import { axiosReq } from "../../api/axiosDefaults";

// Assets
import Upload from "../../assets/upload.svg";

// Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

// CSS
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/PostCreateForms.module.css";

// Hooks
import { useRedirect } from "../../hooks/useRedirect";

// Local Components
import Asset from "../../components/Asset";
import Modal from "../../components/Modal";

// React
import React, { useState, useRef, useEffect } from "react";

// React Router
import { useNavigate } from "react-router-dom";

function PostImageForm({ setPostType, postType }) {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const imageInput = useRef(null);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    imageFile: null,
    tags: "",
    original_author: false,
  });
  const { title, content, image, imageFile, tags, original_author } = postData;
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postDataResponse, setPostDataResponse] = useState(null);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

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

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      const selectedFile = e.target.files[0];
      setPostData({
        ...postData,
        image: URL.createObjectURL(selectedFile),
        imageFile: selectedFile,
      });
    }
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

    if (!imageFile) {
      validationErrors.image = ["Uh-oh - you forgot to upload an image!"];
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageFile);
    formData.append("tags", tags);
    formData.append("original_author", original_author);

    setSubmitting(true);

    try {
      const { data } = await axiosReq.post("/posts/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
        <Container fluid className="mt-4">
          <Button
            variant="link"
            className={`${btnStyles.BackBtn} mb-3 p-0 text-decoration-none d-flex align-items-center`}
            onClick={() => setPostType(null)}
            aria-label="Go back to post type selection"
          >
            <i className={`${appStyles.BackArrow} fas fa-arrow-left me-2`}></i>{" "}
            Go back
          </Button>

          {/* Only show the image section if the 'image' postType is selected */}
          {postType === "image" && (
            <Row>
              <h2 className={styles.CenteredHeading}>Visual Creation</h2>
              <Col xs={12}>
                {/* Image upload section */}
                <Container
                  className={`${appStyles.Content} ${styles.CreateContainer}`}
                >
                  <Form.Group className="text-center">
                    {image ? (
                      <>
                        <figure>
                          <Image
                            className={appStyles.Image}
                            src={image}
                            rounded
                          />
                        </figure>
                        <div>
                          <Form.Label
                            className={`${btnStyles.ChangeBtn} btn`}
                            htmlFor="image-upload"
                          >
                            Change image
                          </Form.Label>
                        </div>
                      </>
                    ) : (
                      <Form.Label
                        className="d-flex justify-content-center"
                        htmlFor="image-upload"
                      >
                        <Asset
                          src={Upload}
                          message="Upload your creation"
                          imgClassName={styles.UploadIcon}
                        />
                      </Form.Label>
                    )}
                    <Form.Control
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleChangeImage}
                      aria-label="Image upload"
                      ref={imageInput}
                      className={styles.FormInput}
                    />
                  </Form.Group>
                  {errors?.image?.map((message, idx) => (
                    <Alert key={idx} variant="warning">
                      {message}
                    </Alert>
                  ))}
                </Container>
              </Col>

              {/* Form fields section */}
              <Col xs={12} className="mt-4">
                <Container
                  className={`${appStyles.Content} ${styles.CreateContainer}`}
                >
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.FormLabel}>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name your creation"
                      name="title"
                      value={title}
                      onChange={handleChange}
                      className={styles.FormInput}
                    />
                    {errors?.title?.map((message, idx) => (
                      <Alert key={idx} variant="warning" className="mt-2">
                        {message}
                      </Alert>
                    ))}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={styles.FormLabel}>
                      Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="A picture tells a thousand words, but a few more never hurt..."
                      rows={6}
                      name="content"
                      value={content}
                      onChange={handleChange}
                      className={styles.FormInput}
                    />
                    {errors?.content?.map((message, idx) => (
                      <Alert key={idx} variant="warning" className="mt-2">
                        {message}
                      </Alert>
                    ))}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className={styles.FormLabel}>
                      Tags
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="tags"
                      value={tags}
                      onChange={handleTagsChange}
                      placeholder="Enter tags separated by commas"
                      className={styles.FormInput}
                    />
                    {errors?.tags?.map((message, idx) => (
                      <Alert key={idx} variant="warning" className="mt-2">
                        {message}
                      </Alert>
                    ))}
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label className={styles.FormLabel}>
                      A <span className={appStyles.InspyredText}>you</span>{" "}
                      original, or an appreciation post? Let us know!
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
                    <Asset spinner message="Creating your post..." />
                  )}

                  <div className="d-flex align-items-left gap-3 mb-2">
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
                      disabled={!imageFile || submitting}
                    >
                      {submitting ? "Creating..." : "Create"}
                    </Button>
                  </div>
                </Container>
              </Col>
            </Row>
          )}
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
        <p>Your post was successuly created!</p>
      </Modal>
    </>
  );
}

export default PostImageForm;
