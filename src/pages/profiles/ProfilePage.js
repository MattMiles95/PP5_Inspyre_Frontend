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
import galleryStyles from "../../styles/PostsGallery.module.css";
import styles from "../../styles/ProfilePage.module.css";

// Local Components
import Asset from "../../components/Asset";

// React
import React, { useEffect, useState } from "react";

// React Components
import InfiniteScroll from "react-infinite-scroll-component";

// React Router
import { Link, useParams } from "react-router-dom";

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
              <i class="fa-solid fa-gears"></i> Edit
            </Link>
          ) : currentUser ? (
            profile?.following_id ? (
              <Button
                className={`${btnStyles.Btn} ml-2`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Btn} ml-2`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            )
          ) : null}
        </div>

        <div className={styles.Stats}>
          <span>{profile?.posts_count} posts </span>
          <span>|</span>
          <span>{profile?.followers_count} followers</span>
          <span>|</span>
          <span>{profile?.following_count} following</span>
        </div>

        {profile?.profile_tags_display?.length > 0 && (
          <div className={styles.Tags}>
            {profile.profile_tags_display.map((tag, index) => (
              <span key={index} className={styles.Tag}>
                {tag.name} {/* Use tag.name to display the tag's name */}
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
    <div className={galleryStyles.GalleryWrapper}>
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
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
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
          className={galleryStyles.GalleryGrid}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </div>
  );

  return (
    <div className="pb-4">
      {hasLoaded ? (
        <>
          <div className={styles.ProfileHeaderWrapper}>{profileHeader}</div>
          {profileGallery}
        </>
      ) : (
        <Asset spinner />
      )}
    </div>
  );
}

export default ProfilePage;
