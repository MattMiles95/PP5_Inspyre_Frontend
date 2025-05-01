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
  const [successMessage, setSuccessMessage] = useState("");
  const { new_password1, new_password2 } = userData;
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      setSuccessMessage("Password changed successfully!");
      setErrors({});
      setUserData({ new_password1: "", new_password2: "" });
    } catch (err) {
      setErrors(err.response?.data);
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
        <Alert key={idx} variant="warning">
          {msg}
        </Alert>
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
        <Alert key={idx} variant="warning">
          {msg}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.SaveBtn} mt-3`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Changing..." : "Change Password"}
      </Button>
    </Form>
  );
};

export default PasswordEditForm;
