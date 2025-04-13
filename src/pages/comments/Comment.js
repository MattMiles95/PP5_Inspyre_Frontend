// React
import React, { useState } from "react";

// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Card from "react-bootstrap/Card";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CSS
import styles from "../../styles/Comment.module.css";

// Local Components
import Avatar from "../../components/Avatar";
import CommentEditForm from "./CommentEditForm";
import PostDropdown from "../../components/PostDropdown";

// React Router
import { Link } from "react-router-dom";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
    approval_status,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      // console.error(err);
    }
  };

  const handleReport = async () => {
    try {
      await axiosRes.put(`/comments/${id}/`, {
        approval_status: 1,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) =>
          comment.id === id
            ? { ...comment, approval_status: 1 }
            : comment
        ),
      }));
    } catch (err) {
      // console.error(err);
    }
  };

  return (
    <>
      <hr />
      <Card>
        <Card.Body className="d-flex align-items-start">
          <Link to={`/profiles/${profile_id}`} className="me-3">
            <Avatar src={profile_image} />
          </Link>

          <div className="flex-grow-1 d-flex justify-content-between align-items-start">
            <div>
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Date}>{updated_at}</span>

              {showEditForm ? (
                <CommentEditForm
                  id={id}
                  profile_id={profile_id}
                  content={content}
                  profileImage={profile_image}
                  setComments={setComments}
                  setShowEditForm={setShowEditForm}
                  approval_status={approval_status}
                />
              ) : approval_status === 1 ? (
                <p className={styles.Reported}>This comment has been reported.</p>
              ) : (
                <p>{content}</p>
              )}
            </div>

            <div className="mt-1">
              {is_owner ? (
                <PostDropdown
                  handleEdit={() => setShowEditForm(true)}
                  handleDelete={handleDelete}
                />
              ) : (
                approval_status !== 1 && (
                  <PostDropdown handleReport={handleReport} />
                )
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Comment;
