// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CSS
import styles from "../../styles/ConversationsPage.module.css";
import btnStyles from "../../styles/Buttons.module.css";

// Local Components
import Asset from "../../components/Asset";

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

  // Fetch conversations initially
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
  }, []);

  // Search users when query changes
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

  const handleBackToConversations = () => {
    setSearchMode(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleUserSelect = async (user) => {
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
          className={`${styles.StartConversationBtn}`}
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
            onClick={handleBackToConversations}
          >
            <i className="fas fa-arrow-left me-2"></i> Back to Conversations
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
                    onClick={() => handleUserSelect(user)}
                    className={styles.SearchResultItem}
                  >
                    {user.username}
                  </ListGroup.Item>
                ))
              : searchQuery.trim() !== "" &&
                !searchLoading && (
                  <div className={styles.EmptyState}>No users found.</div>
                )}
          </ListGroup>
        </>
      )}

      {/* Existing Conversations List */}
      {!searchMode && (
        <ListGroup>
          {conversations.length ? (
            conversations.map((conversation) => {
              const otherUser = conversation.participants.find(
                (participant) => participant.id !== currentUser?.id
              );

              if (!otherUser) return null;

              return (
                <ListGroup.Item
                  key={conversation.id}
                  action
                  as={Link}
                  to={`/messages/conversation/${conversation.id}`}
                  className={styles.ConversationItem}
                >
                  <strong>{otherUser.username}</strong>
                  <br />
                  <small className="text-muted">
                    {conversation.latest_message?.preview || "No messages yet"}
                  </small>
                </ListGroup.Item>
              );
            })
          ) : (
            <div className={styles.EmptyState}>No conversations found.</div>
          )}
        </ListGroup>
      )}
    </Container>
  );
};

export default ConversationsPage;
