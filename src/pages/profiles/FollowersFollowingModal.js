// React
import React, { useEffect, useState } from "react";

// API
import { axiosReq } from "../../api/axiosDefaults";

// Local Components
import Asset from "../../components/Asset";
import Modal from "../../components/Modal";

// CSS
import styles from "../../styles/UserListModal.module.css";

// React Router
import { Link } from "react-router-dom";

function FollowersFollowingModal({ isOpen, onClose, profileId, type }) {
  const [users, setUsers] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchUsers = async () => {
      try {
        setHasLoaded(false);
        const { data } = await axiosReq.get(`/profiles/${profileId}/${type}/`);
        setUsers(data.results);
        setHasLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [isOpen, profileId, type]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === "followers" ? "Followers" : "Following"}
      showConfirm={false}
    >
      {!hasLoaded ? (
        <Asset spinner />
      ) : users.length ? (
        <ul className={styles.UserList}>
          {users.map((user) => (
            <li key={user.id}>
              <Link
                to={`/profiles/${user.id}`}
                onClick={onClose}
                className={styles.UserItem}
              >
                <img
                  src={user.image}
                  alt={user.owner}
                  className={styles.UserAvatar}
                />
                <span className={styles.Username}>{user.owner}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No users found.</p>
      )}
    </Modal>
  );
}

export default FollowersFollowingModal;
