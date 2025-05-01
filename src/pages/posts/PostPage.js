// React
import React, { useEffect, useState } from "react";

// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CSS
import appStyles from "../../App.module.css";
import styles from "../../styles/PostPage.module.css";

// Local Components
import Asset from "../../components/Asset";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import Post from "./Post";
import { fetchMoreData } from "../../utils/utils";

// React Router
import { useParams } from "react-router-dom";

// Infinite Scroll
import InfiniteScroll from "react-infinite-scroll-component";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: postData }, { data: commentsData }] = await Promise.all([
          axiosReq.get(`/posts/${id}/`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [postData] });
        setComments(commentsData);
      } catch (err) {
        // console.error(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={10}>
        {post.results.length ? (
          <Post {...post.results[0]} setPosts={setPost} postPage />
        ) : (
          <Asset spinner />
        )}

        <Container className={`${appStyles.Content} ${styles.CommentSection}`}>
          {currentUser && (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          )}

          {comments.results.length ? (
            <InfiniteScroll
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
              className={styles.ScrollContainer}
            >
              {comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  postId={post.results[0]?.id}
                  setPost={setPost}
                  setComments={setComments}
                />
              ))}
            </InfiniteScroll>
          ) : currentUser ? (
            <span>No one has commented yet... be the first!</span>
          ) : (
            <span>No comments... yet!</span>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;
