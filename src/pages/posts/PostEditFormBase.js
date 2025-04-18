// React
import React, { useState, useRef, useEffect } from "react";

// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap Components
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// CSS
import appStyles from "../../App.module.css";
import postEditStyles from "../../styles/PostEditForm.module.css";

// Local Components
import PostEditImageForm from "./PostEditImageForm";
import PostEditTextForm from "./PostEditTextForm";
import Asset from "../../components/Asset";

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
  });

  const { title, content, image, tags } = postData;
  const imageInput = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const isTextPost = !postData.image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, content, image, is_owner, post_tags } = data;

        if (!is_owner) return navigate("/");

        setPostData({
          title,
          content,
          image,
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
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("post_tags", tags);

    if (imageInput.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return hasLoaded ? (
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
            />
          </Container>
        </Col>
      </Row>
    </Form>
  ) : (
    <Asset spinner />
  );
}

export default PostEditFormBase;
