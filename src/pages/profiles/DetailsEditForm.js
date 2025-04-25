// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

// Context
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

// CSS
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/ProfileEditor.module.css";

// React
import React, { useState, useEffect, useRef } from "react";

// React Router
import { useNavigate, useParams } from "react-router-dom";

const DetailsEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    content: "",
    image: "",
    profile_tags: [],
  });

  const [availableTags, setAvailableTags] = useState([]);
  const [errors, setErrors] = useState({});

  const { content, image, profile_tags } = profileData;

  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const [{ data: profile }, { data: tags }] = await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get("/profile-tags/"),
          ]);
          setProfileData({
            content: profile.content,
            image: profile.image,
            profile_tags: profile.profile_tags_display.map((tag) => tag.id),
          });
          setAvailableTags(tags.results || tags);
        } catch (err) {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };
    handleMount();
  }, [currentUser, id, navigate]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTagChange = (event) => {
    const tagId = parseInt(event.target.value);
    if (event.target.checked) {
      setProfileData((prevData) => ({
        ...prevData,
        profile_tags: [...prevData.profile_tags, tagId],
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        profile_tags: prevData.profile_tags.filter((id) => id !== tagId),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    profile_tags.forEach((tagId) => formData.append("profile_tags", tagId));

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        profile_image: data.image,
      }));
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleAccountDelete = async () => {
    try {
      await axiosReq.delete("/users/delete/");
      setCurrentUser(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  
  const textFields = (
    <>
      <Form.Group>
        <Form.Label className={styles.FormLabel}>
          Tell us about yourself
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={content}
          onChange={handleChange}
          name="content"
          className={styles.FormControl}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Form.Group className={styles.FormSection}>
        <Form.Label className={styles.FormLabel}>
          What kind of creator are you?
        </Form.Label>
        <div className={styles.TagList}>
          {availableTags.map((tag) => {
            const isChecked = profile_tags.includes(tag.id);
            return (
              <label
                key={tag.id}
                className={`${styles.TagCheckbox} ${
                  isChecked ? styles.checked : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={tag.id}
                  checked={isChecked}
                  onChange={handleTagChange}
                />
                {tag.name}
              </label>
            );
          })}
        </div>
        {errors?.profile_tags?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
      </Form.Group>

      <div className={styles.SaveCancelButtons}>
        <Button className={btnStyles.Btn} onClick={() => navigate(-1)}>
          cancel
        </Button>
        <Button className={btnStyles.Btn} type="submit">
          save
        </Button>
      </div>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={7} lg={6} className="py-2 p-0 p-md-2 text-center">
          <Container className={`${appStyles.Content} border-0`}>
            <Form.Group>
              {image && (
                <div className="d-flex flex-column align-items-center">
                  <Image src={image} className={styles.ProfilePicPreview} />
                  <Form.Label
                    htmlFor="image-upload"
                    className={btnStyles.ChangeBtn}
                  >
                    Change image
                  </Form.Label>
                </div>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <Form.Control
                type="file"
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={`${appStyles.Content} border-0`}>
            {textFields}
          </Container>
        </Col>
      </Row>

      <div className={styles.DeleteAccountSection}>
        {!showConfirm ? (
          <Button
            variant="danger"
            className={styles.DeleteBtn}
            onClick={() => setShowConfirm(true)}
          >
            Delete Account
          </Button>
        ) : (
          <div className={styles.DeleteConfirmBox}>
            <p className={styles.ConfirmText}>
              Are you sure you want to delete your account? This will remove
              your profile, posts, followers, and login credentials permanently.
            </p>
            <div className={styles.ConfirmButtons}>
              <Button
                variant="danger"
                className={styles.ConfirmDeleteBtn}
                onClick={handleAccountDelete}
              >
                Yes, delete my account
              </Button>
              <Button
                variant="secondary"
                className={styles.CancelDeleteBtn}
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Form>
  );
};

export default DetailsEditForm;
