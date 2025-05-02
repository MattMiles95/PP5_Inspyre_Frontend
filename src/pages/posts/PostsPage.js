// React
import React, { useEffect, useState } from "react";

// API
import { axiosReq } from "../../api/axiosDefaults";

// Assets
import NoResults from "../../assets/no-results.png";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Bootstrap Icons
import Search from "react-bootstrap-icons/dist/icons/search";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CSS
import styles from "../../styles/PostsGallery.module.css";
import appStyles from "../../App.module.css";

// Local Components
import Asset from "../../components/Asset";
import { Link, useLocation } from "react-router-dom";
import Post from "./Post";

// React Components
import InfiniteScroll from "react-infinite-scroll-component";

// Utils
import { fetchMoreData, stripHtmlTags, truncateText } from "../../utils/utils";

function PostsPage({ message, filter = "" }) {
  const currentUser = useCurrentUser();
  const [posts, setPosts] = useState({ results: [] });
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {}
    };

    const fetchTrending = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/trending/`);
        setTrendingPosts(data);
      } catch (err) {}
    };

    setHasLoaded(false);
    fetchTrending();
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => clearTimeout(timer);
  }, [filter, query, pathname, currentUser]);

  return (
    <div className="pb-4">
      <Row className="g-0 m-0">
        <Col xs={12}>
          <div className={styles.SearchWrapper}>
            <div className={styles.SearchIcon}>
              <Search size={18} />
            </div>
            <Form
              className={styles.SearchBar}
              onSubmit={(e) => e.preventDefault()}
            >
              <Form.Control
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder=" Search..."
              />
            </Form>
          </div>
        </Col>

        {/* Trending Section */}
        {Array.isArray(trendingPosts) && trendingPosts.length > 0 && (
          <div className={styles.TrendingSection}>
            <h5 className={styles.TrendingTitle}>Trending Right Now</h5>
            <div className={styles.TrendingRow}>
              {trendingPosts.map((post) => (
                <Link
                  to={`/posts/${post.id}`}
                  key={post.id}
                  className={styles.TrendingThumbWrapper}
                >
                  {post.image ? (
                    <div className={styles.TrendingThumbContainer}>
                      <img
                        src={post.image}
                        alt="Trending Post"
                        className={styles.TrendingThumb}
                      />
                    </div>
                  ) : (
                    <div className={styles.TextThumbTrending}>
                      {truncateText(stripHtmlTags(post.title), 20)}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Section */}
        <Col xs={12}>
          {hasLoaded ? (
            posts.results.length ? (
              <InfiniteScroll
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
                className={isMobile ? "" : styles.GalleryGrid}
              >
                {posts.results.map((post) =>
                  isMobile ? (
                    <Post
                      key={post.id}
                      {...post}
                      setPosts={setPosts}
                      postPage={false}
                      isPreview
                    />
                  ) : (
                    <Link
                      to={`/posts/${post.id}`}
                      key={post.id}
                      className={styles.ThumbWrapper}
                    >
                      {post.image ? (
                        <div className={styles.ImageContainer}>
                          <img
                            src={post.image}
                            alt="Post"
                            className={styles.Thumb}
                          />
                          <div className={styles.ImageHoverTitle}>
                            {post.title}
                          </div>
                        </div>
                      ) : (
                        <div className={styles.TextThumb}>
                          <div className={styles.TextThumbContent}>
                            {truncateText(stripHtmlTags(post.content), 25)}
                          </div>
                          <div className={styles.TextHoverTitle}>
                            {post.title}
                          </div>
                        </div>
                      )}
                    </Link>
                  )
                )}
              </InfiniteScroll>
            ) : (
              <Container className={appStyles.NoResultContainer}>
                <Image src={NoResults} className={appStyles.NoResult} />
                <p className={appStyles.NoResultText}>
                  Hmm, I can't find anything by that description. Try searching
                  for something else!
                </p>
              </Container>
            )
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default PostsPage;
