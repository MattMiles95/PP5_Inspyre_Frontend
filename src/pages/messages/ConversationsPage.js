// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Local Components
import Asset from "../../components/Asset";
import Modal from "../../components/Modal";

// CSS
import styles from "../../styles/ConversationsPage.module.css";
import btnStyles from "../../styles/Buttons.module.css";

// React
import { useState, useEffect } from "react";

// React Router
import { Link, useNavigate } from "react-router-dom";

const ConversationsPage = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState(null);
  const [selectingUser, setSelectingUser] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await axiosReq.get("/conversations/");
        setConversations(data.results || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [navigate]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        setSearchLoading(false);
        return;
      }

      try {
        setSearchLoading(true);
        const { data } = await axiosReq.get(`/users/?search=${searchQuery}`);
        setSearchResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setSearchLoading(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleStartNewConversation = () => {
    setSearchMode(true);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleBack = () => {
    setSearchMode(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleUserSelect = async (user) => {
    setSelectingUser(true);
    try {
      const { data: conversationsData } = await axiosReq.get("/conversations/");
      const existingConversation = (
        conversationsData.results || conversationsData
      ).find((conversation) =>
        conversation.participants.some((p) => p.id === user.id)
      );

      if (existingConversation) {
        navigate(`/messages/conversation/${existingConversation.id}`);
      } else {
        const newMessage = await axiosReq.post("/messages/", {
          receiver: user.id,
          content: "👋",
        });
        navigate(`/messages/conversation/${newMessage.data.conversation}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSelectingUser(false);
    }
  };

  const handleDeleteConversation = async () => {
    try {
      await axiosReq.delete(`/conversations/${conversationToDelete}/`);
      setConversations((prev) =>
        prev.filter((c) => c.id !== conversationToDelete)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setShowConfirmModal(false);
      setConversationToDelete(null);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Asset spinner />
      </Container>
    );
  }

  return (
    <Container className={`${styles.ConversationsContainer} mt-5 pt-3`}>
      <h3 className={styles.MessagesTitle}>Messages</h3>

      {!searchMode && (
        <Button
          variant="primary"
          className={`${btnStyles.MessageBtn} ${btnStyles.StartNewConvoBtn} mb-3`}
          onClick={handleStartNewConversation}
        >
          Start New Conversation
        </Button>
      )}

      {searchMode && (
        <>
          <Button
            variant="link"
            className={`${btnStyles.BackBtn} mb-3 p-0`}
            onClick={handleBack}
          >
            <i className="fas fa-arrow-left me-2"></i> Back
          </Button>

          <Form className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.SearchInput}
            />
          </Form>

          {searchLoading && (
            <div className="text-center my-3">
              <Asset spinner size="sm" />
            </div>
          )}

          <ListGroup className={styles.SearchResultsList}>
            {searchResults.length
              ? searchResults.map((user) => (
                  <ListGroup.Item
                    key={user.id}
                    action
                    onClick={() => !selectingUser && handleUserSelect(user)}
                    className={`${styles.SearchResultItem} ${
                      selectingUser ? styles.DisabledItem : ""
                    }`}
                  >
                    {user.username}
                    {selectingUser && (
                      <span className="ms-2 ml-2">
                        <i className="fas fa-spinner fa-spin"></i>
                      </span>
                    )}
                  </ListGroup.Item>
                ))
              : searchQuery.trim() !== "" &&
                !searchLoading && (
                  <div className={styles.EmptyState}>No users found.</div>
                )}
          </ListGroup>
        </>
      )}

      {!searchMode && (
        <ListGroup>
          {currentUser && conversations.length ? (
            conversations.map((conversation) => {
              const otherUser = conversation.other_user;
              if (!otherUser) return null;

              const hasUnreadMessages = conversation.has_unread_messages;

              return (
                <div
                  className={styles.ConversationWrapper}
                  key={conversation.id}
                >
                  <ListGroup.Item className={styles.ConversationItem}>
                    <Link
                      to={`/messages/conversation/${conversation.id}`}
                      className={styles.ConversationLink}
                    >
                      <strong>{otherUser.username}</strong>
                      {hasUnreadMessages && (
                        <span className={styles.UnreadIndicator}></span>
                      )}
                      <br />
                      <small className="text-muted">
                        {conversation.latest_message?.preview ||
                          "No messages yet"}
                      </small>
                    </Link>
                  </ListGroup.Item>

                  <div
                    className={styles.TrashIconWrapper}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setConversationToDelete(conversation.id);
                      setShowConfirmModal(true);
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.EmptyState}>No conversations found.</div>
          )}
        </ListGroup>
      )}

      {/* Delete Conversation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDeleteConversation}
        title="Delete Conversation?"
      >
        Are you sure you want to permanently delete this conversation?
      </Modal>
    </Container>
  );
};

export default ConversationsPage;
