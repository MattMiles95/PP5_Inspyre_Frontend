// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CSS
import styles from "../../styles/ConversationsPage.module.css";

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

  const handleUserSelect = async (user) => {
    try {
      const { data } = await axiosReq.get(`/messages/?receiver=${user.id}`);
      if (data.length > 0) {
        navigate(`/messages/conversation/${data[0].conversation}`);
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
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5 pt-3">
      <h3 className="mb-4">Messages</h3>

      {/* Start New Conversation Button */}
      {!searchMode && (
        <Button
          variant="primary"
          className="mb-4"
          onClick={handleStartNewConversation}
        >
          Start New Conversation
        </Button>
      )}

      {/* Search Mode */}
      {searchMode && (
        <>
          <Form className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>

          {searchLoading && (
            <div className="text-center my-3">
              <Spinner animation="border" size="sm" />
            </div>
          )}

          <ListGroup>
            {searchResults.length
              ? searchResults.map((user) => (
                  <ListGroup.Item
                    key={user.id}
                    action
                    onClick={() => handleUserSelect(user)}
                  >
                    {user.username}
                  </ListGroup.Item>
                ))
              : searchQuery.trim() !== "" &&
                !searchLoading && <p>No users found.</p>}
          </ListGroup>
        </>
      )}

      {/* Existing Conversations List */}
      {!searchMode && (
        <ListGroup>
          {conversations.length ? (
            conversations.map((conversation) => {
              const otherUser = conversation.participants.find(
                (p) => p.id !== currentUser?.id
              );

              return (
                <ListGroup.Item
                  key={conversation.id}
                  action
                  as={Link}
                  to={`/messages/conversation/${conversation.id}`}
                >
                  <strong>{otherUser?.username}</strong>
                  <br />
                  <small className="text-muted">
                    {conversation.latest_message?.preview || "No messages yet"}
                  </small>
                </ListGroup.Item>
              );
            })
          ) : (
            <p>No conversations found.</p>
          )}
        </ListGroup>
      )}
    </Container>
  );
};

export default ConversationsPage;
