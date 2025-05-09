// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// Bootstrap Icons
import { Chat, Fire } from "react-bootstrap-icons";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CSS
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/Post.module.css";
import "../../index.css";

// Local Components
import Asset from "../../components/Asset";
import Avatar from "../../components/Avatar";
import CustomDropdown from "../../components/CustomDropdown";
import Modal from "../../components/Modal";

// React
import React, { useState } from "react";

// React Router
import { Link, useNavigate } from "react-router-dom";

// Utils
import { stripHtmlTags, truncateText } from "../../utils/utils";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    content,
    image,
    updated_at,
    post_tags,
    comments_count,
    likes_count,
    like_id,
    is_owner,
    postPage,
    setPosts,
    original_author,
    isPreview = false,
  } = props;

  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => navigate(`/posts/${id}/edit`);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      setShowConfirm(false);
      setShowModal(true);
    } catch (err) {}
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post
        ),
      }));
    } catch (err) {}
  };

  const handleUnlike = async (e) => {
    e.stopPropagation();
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post
        ),
      }));
    } catch (err) {}
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  const handlePostClick = () => {
    if (isPreview) {
      navigate(`/posts/${id}`);
    }
  };

  return (
    <>
      <Card
        className={`${styles.Post} ${isPreview ? styles.PreviewCard : ""}`}
        onClick={handlePostClick}
        style={isPreview ? { cursor: "pointer" } : {}}
      >
        {/* Header */}
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <Link
              to={`/profiles/${profile_id}`}
              className="d-flex align-items-center text-reset text-decoration-none"
              onClick={(e) => e.stopPropagation()}
            >
              <Avatar src={profile_image} height={55} />
              <span className="ml-2 font-weight-bold">{owner}</span>
            </Link>

            {is_owner && postPage && (
              <CustomDropdown
                handleEdit={handleEdit}
                handleDelete={() => setShowConfirm(true)}
              />
            )}
          </div>
          <div className="text-muted small mt-1 text-right">{updated_at}</div>
        </Card.Body>

        {/* Content */}
        <Card.Body className={styles.MediaContainer}>
          {title && <Card.Title className="text-center">{title}</Card.Title>}

          {image && (
            <div className={styles.ImageWrapper}>
              <Card.Img src={image} alt={title} className={styles.PostImage} />
            </div>
          )}

          {content && (
            <div
              className={`ql-editor mt-3 ${
                isPreview ? styles.TextPreview : ""
              }`}
              dangerouslySetInnerHTML={{
                __html: isPreview
                  ? truncateText(stripHtmlTags(content), 50)
                  : content,
              }}
            />
          )}

          {!image && !content && <Asset spinner />}

          {post_tags?.length > 0 && (
            <div className={`${styles.Tags} mt-3`}>
              {post_tags.map((tag, index) => (
                <span key={index} className={styles.Tag}>
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </Card.Body>

        {/* Interactions */}
        {!isPreview && (
          <Card.Body>
            <div className={styles.PostBar}>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own post!</Tooltip>}
                >
                  <div className={styles.IconWithCount}>
                    <Fire className={styles.OwnerFlame} size={20} />
                    <span>{likes_count}</span>
                  </div>
                </OverlayTrigger>
              ) : like_id ? (
                <div onClick={handleUnlike} className={styles.IconWithCount}>
                  <Fire className={styles.LikedFlame} size={20} />
                  <span>{likes_count}</span>
                </div>
              ) : currentUser ? (
                <div onClick={handleLike} className={styles.IconWithCount}>
                  <Fire className={styles.UnlikedFlame} size={20} />
                  <span>{likes_count}</span>
                </div>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to like posts!</Tooltip>}
                >
                  <div className={styles.IconWithCount}>
                    <Fire className={styles.OwnerFlame} size={20} />
                    <span>{likes_count}</span>
                  </div>
                </OverlayTrigger>
              )}

              <div
                className={styles.IconWithCount}
                onClick={(e) => e.stopPropagation()}
              >
                <Chat size={20} />
                <span>{comments_count}</span>
              </div>

              {original_author && (
                <div className={styles.OriginalIndicator}>
                  <i className="fa-solid fa-lightbulb"></i>
                  <span>Original</span>
                </div>
              )}
            </div>
          </Card.Body>
        )}

        {/* Delete Confirmation */}
        {showConfirm && (
          <div className={styles.ConfirmationOverlay}>
            <div className={styles.ConfirmBox}>
              <p>
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className={styles.ConfirmButtons}>
                <button
                  className={`${styles.ConfirmDeleteBtn} btn btn-danger`}
                  onClick={handleDelete}
                >
                  Delete Post
                </button>
                <button
                  className={`${styles.CancelDeleteBtn} btn btn-secondary`}
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Post Deleted"
        customFooter={
          <button onClick={handleModalClose} className={btnStyles.SuccessBtn}>
            Return to Home
          </button>
        }
      >
        <p>Your post was successfully deleted.</p>
      </Modal>
    </>
  );
};

export default Post;
