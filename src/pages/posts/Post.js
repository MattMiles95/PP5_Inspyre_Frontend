// React
import React from "react";

// Bootstrap Components
import { Card } from "react-bootstrap";

// CSS
import styles from "../../styles/Post.module.css";

// Local Components
import Asset from "../../components/Asset";

// React Router
import { Link } from "react-router-dom";

const Post = (props) => {
  const {
    id,
    title,
    content,
    image,
  } = props;

  const renderPreview = () => {
    if (image) {
      return <Card.Img src={image} alt={title} className={styles.PostImage} />;
    } else if (content) {
      const previewText = content.split(" ").slice(0, 50).join(" ") + "...";
      return (
        <Card.Body>
          <Card.Text className={styles.ContentPreview}>{previewText}</Card.Text>
        </Card.Body>
      );
    }
    return <Asset spinner />;
  };

  return (
    <Link to={`/posts/${id}`} className="text-decoration-none text-reset">
      <Card className={`${styles.Post} mb-4`}>
        {renderPreview()}
        {title && (
          <Card.Body>
            <Card.Title className="text-center mb-0">{title}</Card.Title>
          </Card.Body>
        )}
      </Card>
    </Link>
  );
};

export default Post;
