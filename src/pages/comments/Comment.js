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
import btnStyles from "../../styles/Buttons.module.css";

// Local Components
import Avatar from "../../components/Avatar";
import CommentEditForm from "./CommentEditForm";
import PostDropdown from "../../components/PostDropdown";
import CommentReplyForm from "./CommentReplyForm";

// React Router
import { Link } from "react-router-dom";

const Comment = ({
  id,
  profile_id,
  profile_image,
  owner,
  updated_at,
  content,
  approval_status,
  replies = [],
  postId,
  setPost,
  setComments,
  isReply = false,
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const currentUser = useCurrentUser();

  const updateCommentStatus = (comments, idToUpdate) => {
    return comments.map((comment) => {
      if (comment.id === idToUpdate) {
        return { ...comment, approval_status: 1 };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentStatus(comment.replies, idToUpdate),
        };
      }
      return comment;
    });
  };

  const handleDelete = async () => {
    try {
      setFadeOut(true);
      setTimeout(async () => {
        await axiosRes.delete(`/comments/${id}/`);
        setPost((prev) => ({
          results: [
            {
              ...prev.results[0],
              comments_count: prev.results[0].comments_count - 1,
            },
          ],
        }));
        setComments((prev) => ({
          ...prev,
          results: prev.results.filter((comment) => comment.id !== id),
        }));
      }, 400);
    } catch (err) {
      // Handle error
    }
  };

  const handleReport = async () => {
    const confirmReport = window.confirm(
      "Are you sure you want to report this comment?"
    );
    if (!confirmReport) return;

    try {
      await axiosRes.put(`/comments/${id}/report/`);
      setComments((prev) => ({
        ...prev,
        results: updateCommentStatus(prev.results, id),
      }));
    } catch (err) {}
  };

  return (
    <div
      className={`${styles.CommentWrapper} ${fadeOut ? styles.FadeOut : ""}`}
    >
      <Card className={`${styles.CommentCard} ${isReply ? styles.Reply : ""}`}>
        <Card.Body className="d-flex align-items-start p-0">
          <Link to={`/profiles/${profile_id}`} className={styles.Avatar}>
            <Avatar src={profile_image} />
          </Link>

          <div className="flex-grow-1 d-flex justify-content-between align-items-start">
            <div>
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Date}>{updated_at}</span>

              {showEditForm ? (
                <CommentEditForm
                  id={id}
                  content={content}
                  setComments={setComments}
                  setShowEditForm={setShowEditForm}
                  approval_status={approval_status}
                />
              ) : approval_status === 1 ? (
                <p className={styles.Reported}>
                  This comment has been reported.
                </p>
              ) : (
                <p className={styles.CommentText}>{content}</p>
              )}

              {/* Reply Button */}
              {currentUser?.username !== owner &&
                approval_status === 0 &&
                !showReplyForm && (
                  <button
                    className={btnStyles.ReplyBtn}
                    onClick={() => setShowReplyForm(true)}
                  >
                    Reply
                  </button>
                )}

              {/* Reply Form */}
              {showReplyForm && (
                <CommentReplyForm
                  parentId={id}
                  postId={postId}
                  setComments={setComments}
                  setShowReplyForm={setShowReplyForm}
                />
              )}
            </div>

            <div className={styles.Dropdown}>
              {currentUser?.username === owner ? (
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

      {replies.length > 0 && (
        <div className={styles.ReplyGroup}>
          {replies.map((reply) => {
            return (
              <Comment
                key={reply.id}
                {...reply}
                setPost={setPost}
                setComments={setComments}
                postId={postId}
                isReply={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
