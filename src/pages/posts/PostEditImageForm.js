// Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

// CSS
import btnStyles from "../../styles/Buttons.module.css";
import sharedStyles from "../../styles/PostCreateForms.module.css";
import styles from "../../styles/PostEditForm.module.css";

// React
import React from "react";

const PostEditImageForm = ({
  image,
  onImageChange,
  imageInputRef,
  errors,
  original_author,
  setOriginalAuthor,
}) => {
  const handleCheckboxChange = (e) => {
    setOriginalAuthor(e.target.checked);
  };

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

      <Form.Group className={sharedStyles.OriginalAuthorCheckbox}>
        <input
          type="checkbox"
          id="original-author-checkbox"
          checked={original_author}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="original-author-checkbox"
          className={sharedStyles.OriginalAuthorLabel}
        >
          I am the original author of this work
        </label>
      </Form.Group>
    </Form.Group>
  );
};

export default PostEditImageForm;
