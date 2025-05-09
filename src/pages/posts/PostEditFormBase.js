// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap Components
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

// CSS
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import postEditStyles from "../../styles/PostEditForm.module.css";

// Local Components
import Asset from "../../components/Asset";
import Modal from "../../components/Modal";
import PostEditImageForm from "./PostEditImageForm";
import PostEditTextForm from "./PostEditTextForm";

// React
import React, { useState, useRef, useEffect } from "react";

// React Router
import { useNavigate, useParams } from "react-router-dom";

function PostEditFormBase() {
  const [errors, setErrors] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    imageFile: null,
    tags: "",
    original_author: false,
  });

  const { title, content, image, tags, original_author } = postData;
  const imageInput = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isTextPost = postData.image === null || postData.image === "";
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postDataResponse, setPostDataResponse] = useState(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, content, image, is_owner, post_tags, original_author } =
          data;

        if (!is_owner) return navigate("/");

        setPostData({
          title,
          content,
          image,
          original_author,
          tags: Array.isArray(post_tags)
            ? post_tags.map((tag) => tag.name).join(", ")
            : "",
        });

        setHasLoaded(true);
      } catch (err) {}
    };

    handleMount();
  }, [id, navigate]);

  const handleChange = (e) => {
    setPostData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      const selectedFile = e.target.files[0];
      setPostData((prev) => ({
        ...prev,
        image: URL.createObjectURL(selectedFile),
        imageFile: selectedFile,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);
    formData.append("original_author", original_author);

    if (imageInput.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/posts/${id}/`, formData);
      setPostDataResponse(data);
      setShowModal(true);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (postDataResponse?.id) {
      navigate(`/posts/${postDataResponse.id}`);
    }
  };

  return hasLoaded ? (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12}>
            <Container
              className={`${appStyles.Content} ${postEditStyles.FormContainer} d-flex flex-column justify-content-center`}
            >
              {image && (
                <PostEditImageForm
                  image={image}
                  onImageChange={handleChangeImage}
                  imageInputRef={imageInput}
                  errors={errors}
                />
              )}

              <PostEditTextForm
                title={title}
                tags={tags}
                onChange={handleChange}
                errors={errors}
                isTextPost={isTextPost}
                content={content}
                setContent={(value) =>
                  setPostData((prev) => ({ ...prev, content: value }))
                }
                original_author={original_author}
                setOriginalAuthor={(checked) =>
                  setPostData((prev) => ({ ...prev, original_author: checked }))
                }
                saving={saving}
              />
            </Container>
          </Col>
        </Row>
      </Form>

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Post Updated!"
        customFooter={
          <button onClick={handleModalClose} className={btnStyles.SuccessBtn}>
            View Post
          </button>
        }
      >
        <p>Your post was successfully updated!</p>
      </Modal>
    </>
  ) : (
    <Asset spinner />
  );
}

export default PostEditFormBase;
