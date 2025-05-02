// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CSS
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/ProfileEditor.module.css";

// Local Components
import Modal from "../../components/Modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setErrors({});
      setUserData({ new_password1: "", new_password2: "" });
      setIsModalOpen(true);
    } catch (err) {
      setErrors(err.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
          <div key={idx} className="alert alert-warning">
            {msg}
          </div>
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
          <div key={idx} className="alert alert-warning">
            {msg}
          </div>
        ))}
        <Button
          className={`${btnStyles.SaveBtn} mt-3`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Changing..." : "Change Password"}
        </Button>
      </Form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Password Changed"
      >
        <p>Your password was changed successfully.</p>
      </Modal>
    </>
  );
};

export default PasswordEditForm;
