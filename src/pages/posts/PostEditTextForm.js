// React
import React from "react";

// Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// CSS
import postEditStyles from "../../styles/PostEditForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import sharedStyles from "../../styles/PostCreateForms.module.css";

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
  original_author,
  setOriginalAuthor,
}) => {
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setOriginalAuthor(e.target.checked);
  };

  return (
    <>
      <Form.Group>
        <Form.Label className={postEditStyles.FormLabel}>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          className={postEditStyles.FormInput}
        />
        {errors?.title?.map((message, idx) => (
          <Alert
            key={idx}
            variant="warning"
            className={postEditStyles.ErrorAlert}
          >
            {message}
          </Alert>
        ))}
      </Form.Group>

      {isTextPost && (
        <Form.Group className="mt-3">
          <Form.Label className={postEditStyles.FormLabel}>Content</Form.Label>
          <div className={postEditStyles.QuillEditorWrapper}>
            <QuillEditor content={content} onChange={setContent} />
          </div>
          {errors?.content?.map((message, idx) => (
            <Alert
              key={idx}
              variant="warning"
              className={`${postEditStyles.ErrorAlert} mt-2`}
            >
              {message}
            </Alert>
          ))}
        </Form.Group>
      )}

      <Form.Group className="mt-3">
        <Form.Label className={postEditStyles.FormLabel}>
          Tags (comma-separated)
        </Form.Label>
        <Form.Control
          type="text"
          name="tags"
          value={tags}
          onChange={onChange}
          className={postEditStyles.FormInput}
          placeholder="fantasy, sci-fi, illustration..."
        />
        {errors?.post_tags?.map((message, idx) => (
          <Alert
            key={idx}
            variant="warning"
            className={postEditStyles.ErrorAlert}
          >
            {message}
          </Alert>
        ))}
      </Form.Group>

      <Form.Group className={`${sharedStyles.OriginalAuthorCheckbox} mt-4`}>
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

      <div className={postEditStyles.ButtonRow}>
        <Button
          className={btnStyles.CancelBtn}
          onClick={() => navigate(-1)}
          aria-label="Cancel post edit"
        >
          Cancel
        </Button>
        <Button className={btnStyles.CreateBtn} type="submit">
          Save
        </Button>
      </div>
    </>
  );
};

export default PostEditTextForm;
