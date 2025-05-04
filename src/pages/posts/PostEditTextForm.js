// Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// CSS
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import postEditStyles from "../../styles/PostEditForm.module.css";
import sharedStyles from "../../styles/PostCreateForms.module.css";

// Local Components
import QuillEditor from "../../components/QuillEditor";

// React
import React from "react";

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
  username,
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

      <Form.Group className="mt-3">
        <Form.Label className={postEditStyles.FormLabel}>
          {isTextPost ? "Content" : "Description"}
        </Form.Label>
        {isTextPost ? (
          <div className={postEditStyles.QuillEditorWrapper}>
            <QuillEditor content={content} onChange={setContent} />
          </div>
        ) : (
          <Form.Control
            as="textarea"
            rows={4}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="A picture says a thousand words, but a few more never hurt..."
            className={postEditStyles.FormInput}
          />
        )}
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

      <Form.Group className="mt-3">
        <Form.Label className={postEditStyles.FormLabel}>
          A <span className={appStyles.InspyredText}>you</span> original, or an
          appreciation post? Let us know!
        </Form.Label>
        <div className={sharedStyles.OriginalAuthorCheckbox}>
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
        </div>
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
