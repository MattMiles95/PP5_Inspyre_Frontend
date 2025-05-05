// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Card from "react-bootstrap/Card";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CSS
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/Comment.module.css";

// Local Components
import Avatar from "../../components/Avatar";
import CommentEditForm from "./CommentEditForm";
import CommentReplyForm from "./CommentReplyForm";
import CustomDropdown from "../../components/CustomDropdown";
import Modal from "../../components/Modal";

// React
import React, { useState } from "react";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

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

  const performReport = async () => {
    try {
      await axiosRes.put(`/comments/${id}/report/`);
      setComments((prev) => ({
        ...prev,
        results: updateCommentStatus(prev.results, id),
      }));
    } catch (err) {
      // Handle error
    }
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
            <div className="flex-grow-1 w-100" style={{ minWidth: 0 }}>
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
                <CustomDropdown
                  handleEdit={() => setShowEditForm(true)}
                  handleDelete={() => setShowDeleteModal(true)}
                />
              ) : (
                approval_status !== 1 && (
                  <CustomDropdown
                    handleReport={() => setShowReportModal(true)}
                  />
                )
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
        onConfirm={() => {
          setShowDeleteModal(false);
          handleDelete();
        }}
      >
        Are you sure you want to delete this comment? This action cannot be
        undone.
      </Modal>

      {/* Report Modal */}
      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="Report Comment"
        onConfirm={() => {
          performReport();
          setShowReportModal(false);
        }}
      >
        Are you sure you want to report this comment? It will be reviewed by
        moderators.
      </Modal>

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
