// React
import React from "react";

// API
import { axiosRes } from "../../api/axiosDefaults";

// Bootstrap Components
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// Bootstrap Icons
import { Chat, Heart, HeartFill } from "react-bootstrap-icons";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CSS
import styles from "../../styles/Post.module.css";
import "../../index.css";

// Local Components
import Asset from "../../components/Asset";
import Avatar from "../../components/Avatar";
import PostDropdown from "../../components/PostDropdown";

// React Router
import { Link, useNavigate } from "react-router-dom";

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
  } = props;

  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/posts/${id}/edit`);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      navigate(-1);
    } catch (err) {
      // console.error(err);
    }
  };

  const handleLike = async () => {
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
    } catch (err) {
      // console.error(err);
    }
  };

  const handleUnlike = async () => {
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
    } catch (err) {
      // console.error(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <Link
            to={`/profiles/${profile_id}`}
            className="d-flex align-items-center text-reset text-decoration-none"
          >
            <Avatar src={profile_image} height={55} />
            <span className="ml-2 font-weight-bold">{owner}</span>
          </Link>
          {is_owner && postPage && (
            <PostDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </div>
        <div className="text-muted small mt-1 text-right">{updated_at}</div>
      </Card.Body>

      {/* Unified content block: title, image or content */}
      <Card.Body className={styles.MediaContainer}>
        {title && <Card.Title className="text-center">{title}</Card.Title>}

        {image ? (
          <div className={styles.ImageWrapper}>
            <Card.Img src={image} alt={title} className={styles.PostImage} />
          </div>
        ) : content ? (
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <Asset spinner />
        )}

        {/* Tags */}
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

      {/* Engagement bar */}
      <Card.Body>
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <Heart className="mr-1" size={20} />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <HeartFill className={`mr-1 ${styles.Heart}`} size={20} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <Heart className={`mr-1 ${styles.HeartOutline}`} size={20} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <Heart className="mr-1" size={20} />
            </OverlayTrigger>
          )}
          {likes_count}

          <Chat className="ml-4 mr-1" size={20} />
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
