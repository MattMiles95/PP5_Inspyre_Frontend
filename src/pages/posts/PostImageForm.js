// React
import React, { useState, useRef, useEffect } from "react";

// API
import { axiosReq } from "../../api/axiosDefaults";

// Assets
import Upload from "../../assets/upload.svg";

// Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

// CSS
import styles from "../../styles/PostCreateForms.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";

// Hooks
import { UseRedirect } from "../../hooks/UseRedirect";

// Local Components
import Asset from "../../components/Asset";

// React Router
import { useNavigate } from "react-router-dom";

function PostImageForm({ setPostType, postType }) {
  UseRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const imageInput = useRef(null);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    imageFile: null,
    tags: "",
  });
  const { title, content, image, imageFile, tags } = postData;

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

  const handleSubmit = async (e) => {
    if (!imageFile) {
      setErrors({ image: ["You forgot to add your image!"] });
      return;
    }

    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageFile);
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
      <Container fluid className="mt-4">
        <Button
          variant="link"
          className={`${btnStyles.BackBtn} mb-3 p-0 text-decoration-none d-flex align-items-center`}
          onClick={() => setPostType(null)}
          aria-label="Go back to post type selection"
        >
          <i className="fas fa-arrow-left me-2"></i> Go back
        </Button>

        {/* Only show the image section if the 'image' postType is selected */}
        {postType === "image" && (
          <Row>
            <h2 className={styles.CenteredHeading}>Visual Creation</h2>
            <Col xs={12}>
              {/* Image upload section */}
              <Container className={`${appStyles.Content} ${styles.Container}`}>
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
                        height={50}
                        message="Upload your creation"
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
              <Container className={`${appStyles.Content} ${styles.Container}`}>
                <Form.Group className="mb-3">
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

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="A picture tells a thousand words, but a few more never hurt..."
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

                <Form.Group className="mb-4">
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
                    disabled={!imageFile}
                  >
                    Create
                  </Button>
                </div>
              </Container>
            </Col>
          </Row>
        )}
      </Container>
    </Form>
  );
}

export default PostImageForm;
