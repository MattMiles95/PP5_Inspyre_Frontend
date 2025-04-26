// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

// Bootstrap Icons
import { SendFill } from "react-bootstrap-icons";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CSS
import styles from "../../styles/ConversationPage.module.css";
import btnStyles from "../../styles/Buttons.module.css";

// Local Components
import Asset from "../../components/Asset";
import Avatar from "../../components/Avatar";

// React
import React, { useEffect, useRef, useState } from "react";

// React Router
import { Link, useParams, useNavigate } from "react-router-dom";

const ConversationPage = () => {
  const { id: conversationId } = useParams();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [otherUser, setOtherUser] = useState(null);

  const messagesEndRef = useRef(null);

  // Fetch conversation participants
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch messages
        const { data: messageData } = await axiosReq.get(
          `/messages/?conversation_id=${conversationId}`
        );
        setMessages(messageData.results || messageData);

        // Fetch conversation participants
        const { data: conversationData } = await axiosReq.get(
          `/conversations/${conversationId}/`
        );
        const other = conversationData.participants.find(
          (participant) => participant.id !== currentUser?.id
        );
        setOtherUser(other);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [conversationId, currentUser?.id]);

  // Fetch conversation messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axiosReq.get(
          `/messages/?conversation_id=${conversationId}`
        );
        setMessages(data.results || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { data } = await axiosReq.post("/messages/", {
        receiver: otherUser?.id,
        content: newMessage.trim(),
      });

      setMessages((prevMessages) => [data, ...prevMessages]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate("/conversations");
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Asset spinner />
      </Container>
    );
  }

  return (
    <Container className={`${styles.ConversationContainer} mt-4`}>
      {/* Conversation Header */}
      {otherUser && (
        <div className={styles.ConversationHeader}>
          <div className={styles.HeaderTopRow}>
            <Button
              variant="link"
              className={`${btnStyles.BackBtn} p-0`}
              onClick={handleBack}
            >
              <i className="fas fa-arrow-left me-2"></i> Back
            </Button>
          </div>
          {otherUser && (
            <Link to={`/profiles/${otherUser.id}`} className={styles.UserLink}>
              <Avatar src={otherUser.profile_image} height={70} />
              <strong className={styles.Username}>{otherUser.username}</strong>
            </Link>
          )}
        </div>
      )}

      {/* Messages List */}
      <Row className={`${styles.MessagesWrapper} mt-3`}>
        <Col xs={12}>
          <ListGroup className={styles.MessagesList}>
            {messages.length ? (
              [...messages].reverse().map((message) => (
                <ListGroup.Item
                  key={message.id}
                  className={`${styles.MessageRow} ${
                    message.sender.id === currentUser?.id
                      ? styles.SenderMessage
                      : styles.ReceiverMessage
                  }`}
                >
                  <div className={styles.MessageBubble}>
                    <strong>{message.sender.username}</strong>:{" "}
                    {message.content}
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <p className={styles.EmptyState}>No messages yet.</p>
            )}
            <div ref={messagesEndRef} />
          </ListGroup>
        </Col>
      </Row>

      {/* Message Input */}
      <Row className="m-3">
        <Col xs={10}>
          <Form onSubmit={handleSendMessage}>
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={styles.MessageInput}
            />
          </Form>
        </Col>
        <Col xs={2} className="d-flex align-items-center">
          <Button
            className={styles.SendBtn}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <SendFill />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ConversationPage;
