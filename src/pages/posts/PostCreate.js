// Bootstrap Components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// CSS
import styles from "../../styles/PostCreateForms.module.css";

// Hooks
import { useRedirect } from "../../hooks/useRedirect";

// Local Components
import PostImageForm from "./PostImageForm";
import PostTextForm from "./PostTextForm";

// React
import React, { useState } from "react";

const PostCreate = () => {
  useRedirect("loggedOut");
  const [postType, setPostType] = useState(null);

  const handlePostTypeSelect = (type) => {
    setPostType(type);
  };

  return (
    <Container className="mt-4">
      <Card className={styles.SelectionCard}>
        <Card.Body>
          {/* Hide the headings when postType is selected */}
          {!postType && (
            <div className={styles.HeaderSection}>
              <h1>What Will You Create Today?</h1>
              <h2>Choose your medium and let your creativity take the lead.</h2>
            </div>
          )}

          {!postType && (
            <Row className="justify-content-around text-center">
              <Col xs={12} md={5}>
                <p className={styles.ChoiceDescription}>
                  Share your world through images — whether it's digital art,
                  illustrations, photography, or anything in between.
                </p>
                <Button
                  variant="outline-primary"
                  className={`w-100 ${styles.SelectButton}`}
                  onClick={() => handlePostTypeSelect("image")}
                >
                  Visual Creation
                </Button>
              </Col>
              <Col xs={12} md={5} className="mt-4 mt-md-0">
                <p className={styles.ChoiceDescription}>
                  Craft something meaningful with words — from short stories and
                  poetry to thought-provoking articles and beyond.
                </p>
                <Button
                  variant="outline-primary"
                  className={`w-100 ${styles.SelectButton}`}
                  onClick={() => handlePostTypeSelect("text")}
                >
                  Written Creation
                </Button>
              </Col>
            </Row>
          )}

          {postType === "image" && <PostImageForm setPostType={setPostType} postType={postType} />}
          {postType === "text" && <PostTextForm setPostType={setPostType} postType={postType} />}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostCreate;
