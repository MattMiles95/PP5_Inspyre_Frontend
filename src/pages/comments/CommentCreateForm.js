// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// CSS
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/CommentCreateEditForm.module.css";

// Local Components
import Avatar from "../../components/Avatar";

// React
import React, { useState } from "react";

// React Router
import { Link } from "react-router-dom";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPosting(true);
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    } finally {
      setPosting(false);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="Leave a comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
          {errors?.content?.map((message, idx) => (
            <div key={idx} className="text-danger small mt-1">
              {message}
            </div>
          ))}
        </InputGroup>
      </Form.Group>
      <button
        className={`${btnStyles.CommentBtn} btn d-block ml-auto`}
        disabled={!content.trim() || posting}
        type="submit"
      >
        {posting ? "posting..." : "post"}
      </button>
    </Form>
  );
}

export default CommentCreateForm;
