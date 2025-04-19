// React
import React from "react";

// Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// CSS
import styles from "../../styles/PostEditForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";

// Local Components
import QuillEditor from "../../components/QuillEditor";

// React Router
import { useNavigate } from "react-router-dom";

const PostEditTextForm = ({
  title,
  tags,
  onChange,
  errors,
  isTextPost,
  content,
  setContent,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Form.Group>
        <Form.Label className={styles.FormLabel}>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          className={styles.FormInput}
        />
        {errors?.title?.map((message, idx) => (
          <Alert key={idx} variant="warning" className={styles.ErrorAlert}>
            {message}
          </Alert>
        ))}
      </Form.Group>

      {isTextPost && (
        <Form.Group className="mt-3">
          <Form.Label className={styles.FormLabel}>Content</Form.Label>
          <div className={styles.QuillEditorWrapper}>
            <QuillEditor content={content} onChange={setContent} />
          </div>
          {errors?.content?.map((message, idx) => (
            <Alert key={idx} variant="warning" className={`${styles.ErrorAlert} mt-2`}>
              {message}
            </Alert>
          ))}
        </Form.Group>
      )}

      <Form.Group className="mt-3">
        <Form.Label className={styles.FormLabel}>
          Tags (comma-separated)
        </Form.Label>
        <Form.Control
          type="text"
          name="tags"
          value={tags}
          onChange={onChange}
          className={styles.FormInput}
          placeholder="fantasy, sci-fi, illustration..."
        />
        {errors?.post_tags?.map((message, idx) => (
          <Alert key={idx} variant="warning" className={styles.ErrorAlert}>
            {message}
          </Alert>
        ))}
      </Form.Group>

      <div className={styles.ButtonRow}>
        <Button
          className={btnStyles.CancelBtn}
          onClick={() => navigate(-1)}
          aria-label="Cancel post edit"
        >
          Cancel
        </Button>
        <Button
          className={btnStyles.CreateBtn}
          type="submit"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default PostEditTextForm;
