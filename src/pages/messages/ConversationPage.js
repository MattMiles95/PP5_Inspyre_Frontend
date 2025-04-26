// API
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

// CSS
import styles from "../../styles/ConversationPage.module.css";

// Local Components
import Asset from "../../components/Asset";

// React
import React, { useEffect, useRef, useState } from "react";

// React Router
import { useParams } from "react-router-dom";

const ConversationPage = () => {
  const { id: conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

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

  // Auto-scroll to bottom
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
        receiver: getOtherUserId(),
        content: newMessage.trim(),
      });

      setMessages((prevMessages) => [data, ...prevMessages]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const getOtherUserId = () => {
    const latestMessage = messages[0];
    if (!latestMessage) return null;
    const currentUserId =
      latestMessage.sender.id === latestMessage.receiver.id
        ? latestMessage.receiver.id
        : latestMessage.sender.id;
    return currentUserId;
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Asset spinner />
      </Container>
    );
  }

  return (
    <Container className={styles.ConversationContainer}>
      <Row className={styles.MessagesWrapper}>
        <Col xs={12}>
          <ListGroup className={styles.MessagesList}>
            {messages.length ? (
              [...messages].reverse().map((message) => (
                <ListGroup.Item
                  key={message.id}
                  className={styles.MessageBubble}
                >
                  <strong>{message.sender.username}</strong>: {message.content}
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
      <Row className="mt-3">
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
            className={styles.SendButton}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            Send
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ConversationPage;
