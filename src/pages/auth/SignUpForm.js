// API
import axios from "axios";

// Assets
import signupHero from "../../assets/signup_hero.png";

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
import styles from "../../styles/SignInUpForm.module.css";

// Hooks
import { useRedirect } from "../../hooks/useRedirect";

// Local Components
import Modal from "../../components/Modal";

// React
import React, { useState } from "react";

// React Router
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  useRedirect("loggedIn");

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      setShowModal(true);
    } catch (err) {
      setErrors(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/signin");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row className={`${styles.Row} no-gutters`}>
        <Col
          md={6}
          className={`${styles.SignUpCol}my-auto d-none d-md-block h-100`}
        >
          <Image className={appStyles.FillerImage} src={signupHero} />
        </Col>
        <Col className="pl-0 my-auto md-2" md={6}>
          <Container className="p-4">
            <h1 className={styles.Header}>Become Inspyred</h1>
            <div className={`${styles.HeaderText} text-center`}>
              <span>Join our community of creators today.</span>
              <p>
                Draw. Write. Share.{" "}
                <span className={appStyles.InspyredText}>Inspyre</span>
              </p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password1?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password2?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Button
                className={`${btnStyles.AuthBtn} ${btnStyles.Btn}`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Join"}
              </Button>

              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
          <div className="m-4 text-center">
            Already a member?{" "}
            <Link className={styles.AuthLink} to="/signin">
              Login
            </Link>
          </div>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Welcome to Inspyre!"
        customFooter={
          <button onClick={handleModalClose} className={btnStyles.ContinueBtn}>
            Continue to sign in page
          </button>
        }
      >
        <p>Your account has been successfully created.</p>
      </Modal>
    </Container>
  );
};

export default SignUpForm;
