// API
import { axiosReq } from "../../api/axiosDefaults";

// Assets
import NoResults from "../../assets/no-results.png";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";

// CSS
import btnStyles from "../../styles/Buttons.module.css";
import errorStyles from "../../styles/CustomErrors.module.css";
import galleryStyles from "../../styles/PostsGallery.module.css";
import styles from "../../styles/ProfilePage.module.css";

// Local Components
import Asset from "../../components/Asset";
import FollowersFollowingModal from "./FollowersFollowingModal";
import Post from "../posts/Post";

// React
import React, { useEffect, useState } from "react";

// React Components
import InfiniteScroll from "react-infinite-scroll-component";

// React Router
import { Link, useNavigate, useParams } from "react-router-dom";

// Utils
import { fetchMoreData, stripHtmlTags, truncateText } from "../../utils/utils";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results || [];
  const is_owner = currentUser?.username === profile?.owner;
  const navigate = useNavigate();
  const [isMessageSubmitting, setIsMessageSubmitting] = useState(false);
  const [isFollowSubmitting, setIsFollowSubmitting] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("followers");
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFollowSubmit = async () => {
    setIsFollowSubmitting(true);
    try {
      await handleFollow(profile);
    } finally {
      setIsFollowSubmitting(false);
    }
  };

  const handleUnfollowSubmit = async () => {
    setIsFollowSubmitting(true);
    try {
      await handleUnfollow(profile);
    } finally {
      setIsFollowSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const handleMessage = async () => {
    setIsMessageSubmitting(true);
    try {
      const { data: conversationsData } = await axiosReq.get("/conversations/");
      const existingConversation = (
        conversationsData.results || conversationsData
      ).find((conversation) =>
        conversation.participants.some((p) => p.id === profile?.id)
      );

      if (existingConversation) {
        navigate(`/messages/conversation/${existingConversation.id}`);
      } else {
        const newMessage = await axiosReq.post("/messages/", {
          receiver: profile?.id,
          content: "👋",
        });
        navigate(`/messages/conversation/${newMessage.data.conversation}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsMessageSubmitting(false);
    }
  };

  const profileHeader = (
    <div className={styles.ProfileHeader}>
      <Image
        className={styles.ProfileImage}
        roundedCircle
        src={profile?.image}
      />
      <div className={styles.ProfileInfo}>
        <div className={styles.HeaderTopRow}>
          <h2 className={styles.Username}>{profile?.owner}</h2>
          {is_owner ? (
            <Link
              to={`/profiles/${id}/edit`}
              className={`${btnStyles.EditProfileBtn} ml-2`}
            >
              <i className="fa-solid fa-gears"></i> Edit
            </Link>
          ) : currentUser ? (
            <>
              {profile?.following_id ? (
                <Button
                  className={`${btnStyles.UnfollowBtn} ml-2`}
                  onClick={handleUnfollowSubmit}
                  disabled={isFollowSubmitting}
                >
                  {isFollowSubmitting ? "Unfollowing..." : "Unfollow"}
                </Button>
              ) : (
                <Button
                  className={`${btnStyles.FollowBtn} ml-2`}
                  onClick={handleFollowSubmit}
                  disabled={isFollowSubmitting}
                >
                  {isFollowSubmitting ? "Following..." : "Follow"}
                </Button>
              )}

              <Button
                className={`${btnStyles.MessageBtn} ml-2`}
                onClick={handleMessage}
                disabled={isMessageSubmitting}
              >
                {isMessageSubmitting ? (
                  <span className="d-flex align-items-center gap-1">
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span>Loading...</span>
                  </span>
                ) : (
                  "Message"
                )}
              </Button>
            </>
          ) : null}
        </div>

        <div className={styles.Stats}>
          <span>{profile?.posts_count} posts</span>
          <span>|</span>
          <button
            className={btnStyles.StatBtn}
            onClick={() => openModal("followers")}
          >
            {profile?.followers_count} followers
          </button>
          <span>|</span>
          <button
            className={btnStyles.StatBtn}
            onClick={() => openModal("following")}
          >
            {profile?.following_count} following
          </button>
        </div>

        {profile?.profile_tags_display?.length > 0 && (
          <div className={styles.Tags}>
            {profile.profile_tags_display.map((tag, index) => (
              <span key={index} className={styles.Tag}>
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {profile?.content && (
          <div className={styles.Bio}>
            <p>{profile.content}</p>
          </div>
        )}
      </div>
    </div>
  );

  const profileGallery = (
    <div className={styles.GalleryWrapper}>
      {profilePosts.results.length ? (
        <InfiniteScroll
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
          className={isMobile ? "" : styles.GalleryGrid}
        >
          {profilePosts.results.map((post) =>
            isMobile ? (
              <Post
                key={post.id}
                {...post}
                setPosts={setProfilePosts}
                postPage={false}
                isPreview
              />
            ) : (
              <Link
                to={`/posts/${post.id}`}
                key={post.id}
                className={galleryStyles.ThumbWrapper}
              >
                {post.image ? (
                  <div className={galleryStyles.ImageContainer}>
                    <img
                      src={post.image}
                      alt="Post"
                      className={galleryStyles.Thumb}
                    />
                  </div>
                ) : (
                  <div className={galleryStyles.TextThumb}>
                    <div className={galleryStyles.TextThumbContent}>
                      {truncateText(stripHtmlTags(post.content), 25)}
                    </div>
                    <div className={galleryStyles.TextHoverTitle}>
                      {post.title}
                    </div>
                  </div>
                )}
              </Link>
            )
          )}
        </InfiniteScroll>
      ) : (
        <div className={`text-center ${errorStyles.ErrorWrapper}`}>
          <Image
            src={NoResults}
            className={errorStyles.ErrorImage}
            alt="Page Not Found"
          />
          <h2 className={`mt-4 ${errorStyles.ErrorTitle}`}>
            Hmm... There's nothing here!?
          </h2>
          {is_owner ? (
            <div>
              <p className={`mt-3 ${errorStyles.ErrorMessage}`}>
                Ready to get started?
              </p>
              <Link
                to="/posts/inspyre"
                className={`btn ${btnStyles.SaveBtn} mt-2`}
              >
                Create your first post
              </Link>
            </div>
          ) : (
            <p className={`mt-3 ${errorStyles.ErrorMessage}`}>
              {profile?.owner} hasn't posted yet!
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={`${styles.ProfilePageWrapper} pb-4`}>
      {hasLoaded ? (
        <>
          <div className={styles.ProfileHeaderWrapper}>{profileHeader}</div>
          {profileGallery}
        </>
      ) : (
        <Asset spinner />
      )}

      <FollowersFollowingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        profileId={id}
        type={modalType}
      />
    </div>
  );
}

export default ProfilePage;
