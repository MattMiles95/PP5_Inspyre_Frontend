// Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

// CSS
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/PostEditForm.module.css";

// React
import React from "react";

const PostEditImageForm = ({ image, onImageChange, imageInputRef, errors }) => {
  return (
    <Form.Group className="text-center">
      <figure>
        <Image className={styles.ImagePreview} src={image} rounded />
      </figure>
      <div>
        <Form.Label
          className={`${btnStyles.ChangeBtn} btn`}
          htmlFor="image-upload"
        >
          Change image
        </Form.Label>
      </div>
      <Form.Control
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={onImageChange}
        aria-label="Image upload"
        ref={imageInputRef}
      />
      {errors?.image?.map((message, idx) => (
        <Alert key={idx} variant="warning" className={styles.ErrorAlert}>
          {message}
        </Alert>
      ))}
    </Form.Group>
  );
};

export default PostEditImageForm;
