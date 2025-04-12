// React
import React, { useState } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Local Components
import PostImageForm from "./PostImageForm";
import PostTextForm from "./PostTextForm";

// CSS
import styles from "../../styles/PostCreateForms.module.css";

const PostCreate = () => {
  const [postType, setPostType] = useState(null);

  const handlePostTypeSelect = (type) => {
    setPostType(type);
  };

  return (
    <Container className={`mt-4 ${styles.CreateContainer}`}>
      <Card className={styles.SelectionCard}>
        <Card.Body>
          <h2 className="text-center mb-4">Create New Post</h2>
          {!postType && (
            <Row className="justify-content-around">
              <Col xs={12} md={5}>
                <Button
                  variant="outline-primary"
                  className={`w-100 ${styles.SelectButton}`}
                  onClick={() => handlePostTypeSelect('image')}
                >
                  Create Image Post
                </Button>
              </Col>
              <Col xs={12} md={5}>
                <Button
                  variant="outline-primary"
                  className={`w-100 ${styles.SelectButton}`}
                  onClick={() => handlePostTypeSelect('text')}
                >
                  Create Text Post
                </Button>
              </Col>
            </Row>
          )}
          
          {postType === 'image' && <PostImageForm />}
          {postType === 'text' && <PostTextForm />}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostCreate;