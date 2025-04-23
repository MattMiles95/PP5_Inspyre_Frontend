// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CSS
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/ProfileEditor.module.css";

// React
import React, { useEffect, useState } from "react";

// React Router
import { useNavigate, useParams } from "react-router-dom";

const PasswordEditForm = () => {
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const [errors, setErrors] = useState({});
  const { new_password1, new_password2 } = userData;
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      navigate("/");
    }
  }, [currentUser, id, navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          name="new_password1"
          value={new_password1}
          onChange={handleChange}
          className={styles.FormInput}
        />
      </Form.Group>
      {errors?.new_password1?.map((msg, idx) => (
        <Alert key={idx} variant="warning">{msg}</Alert>
      ))}
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="new_password2"
          value={new_password2}
          onChange={handleChange}
          className={styles.FormInput}
        />
      </Form.Group>
      {errors?.new_password2?.map((msg, idx) => (
        <Alert key={idx} variant="warning">{msg}</Alert>
      ))}
      <Button type="submit" className={`${btnStyles.Btn} mt-2`}>
        Change Password
      </Button>
    </Form>
  );
};

export default PasswordEditForm;
