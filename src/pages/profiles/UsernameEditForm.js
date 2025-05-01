// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Context
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

// CSS
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/ProfileEditor.module.css";

// React
import React, { useEffect, useState } from "react";

// React Router
import { useNavigate, useParams } from "react-router-dom";

const UsernameEditForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      navigate("/");
    }
  }, [currentUser, id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axiosRes.put("/dj-rest-auth/user/", { username });
      setCurrentUser((prev) => ({ ...prev, username }));
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Choose a new Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.FormInput}
        />
      </Form.Group>
      {errors?.username?.map((msg, idx) => (
        <Alert key={idx} variant="warning">
          {msg}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.SaveBtn} mt-3`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Username"}
      </Button>
    </Form>
  );
};

export default UsernameEditForm;
