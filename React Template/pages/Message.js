import Head from "next/head";
import { useState, useEffect, useCallback, useRef } from "react";
import Slider from "react-slick";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import { logoSlider } from "../src/sliderProps";
import { get, set } from "local-storage";
import io from "socket.io-client";
import AccessDach from "./Access";
import { Row, Col } from "react-bootstrap";
import { MdSend, MdCall } from "react-icons/md";
import { useRouter } from "next/router";
import badWords from "../src/BadWords";
export default function Message() {
  const socket = io.connect("http://localhost:5002");

  socket.on("connect", () => {
    console.log("Connected to server");
  });
  const messageListRef = useRef(null);
  const router = useRouter();
  const messageId = router.query.id;
  const [connectedUser, setConnectedUser] = useState(null);
  const profile = get("profile");
  const [selectedUser, setSelectedUser] = useState(
    messageId ? { _id: messageId } : null
  );
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [filtredUsers, setFilteredUsers] = useState([]);

  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setConnectedUser(profile);
    fetch("http://localhost:5000/api/users/lastMessages/" + profile?._id)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [selectedUser]);
  useEffect(() => {
    fetch("http://localhost:5000/api/users/messages/" + profile._id)
      .then((response) => response.json())
      .then((messages) => {
        setMessages(messages);
        console.log(messages);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (event) => {
    const filteredUsers = users.filter((user) =>
      user.user[0].name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    // Listen for 'receiveMsg' event emitted from the server
    socket.on("receiveMsg", (message) => {
      setMessages(message);

      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    });
    socket.on("userMsg", (incomingUser) => {
      const isProfileInConversation =
        incomingUser[0].from === profile._id ||
        incomingUser[0].to === profile._id;

      if (isProfileInConversation) {
        const existingConversation = users.find(
          (user) =>
            (user.from === incomingUser[0].from &&
              user.to === incomingUser[0].to) ||
            (user.from === incomingUser[0].to &&
              user.to === incomingUser[0].from)
        );
        if (existingConversation) {
          const updatedUsers = [
            {
              ...existingConversation,
              text: incomingUser[0].text,
              to: incomingUser[0].to,
              from: incomingUser[0].from,
              read: false,
              createdAt: incomingUser[0].createdAt,
            },
            ...users.filter((user) => user._id !== existingConversation._id),
          ];

          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
        } else {
          setUsers((prevUsers) => [incomingUser[0], ...prevUsers]);
          setFilteredUsers((prevUsers) => [incomingUser[0], ...prevUsers]);
        }

        if (messageListRef.current) {
          messageListRef.current.scrollTop =
            messageListRef.current.scrollHeight;
        }
      }
    });
  
    // Clean up the event listener when component unmounts
    return () => {
      socket.off("receiveMsg");
      socket.off("userMsg");
    };
  }, [socket]);
  const getTimeDiff = (createdAt) => {
    const diffMs = Date.now() - new Date(createdAt).getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30));
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    } else {
      return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
    }
  };

  const handleSendClick = useCallback(
    (event) => {
      event.preventDefault();
      if (!messageInput || !selectedUser) {
        return;
      }
      let detected = false;

      const regex = new RegExp(badWords.join("|"), "gi");
      const filtered = messageInput.replace(regex, (match) => {
        detected = true;
        return "*".repeat(match.length);
      });

      const message = {
        from: profile._id,
        to: selectedUser._id,
        text: filtered,
        detected: detected,
      };

      // Emit the message to the server
      socket.emit("sendMsg", message);
      setMessageInput("");
    },
    [messageInput, selectedUser, socket]
  );

  return (
    <>
      {!connectedUser && <AccessDach />}
      {connectedUser && (
        <Layout>
          <div className="messenger-container">
            <div className="messenger-user-list">
              <div
                className="messenger-user-scroll-panel"
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  height: "310px",
                  paddingRight: "10px",
                  
                }}
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="messenger-search-input"
                  onChange={handleSearch}
                />
                {filtredUsers.map((user) => (
                  <div
                    key={user._id}
                    className={`messenger-user ${
                      selectedUser && user._id === selectedUser._id
                        ? "selected"
                        : ""
                    } ${
                      user.read === false && user.to === profile._id
                        ? "not-read"
                        : ""
                    }`}
                    onClick={() => handleUserClick(user)}
                    style={{ cursor: "pointer" }}
                  >
                    <Row>
                      <Col md={3}>
                        <img
                          src={`http://localhost:5000/api/users/file/${user?._id}`}
                          alt="Sender"
                          style={{
                            height: "3rem",
                            width: "3rem",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </Col>
                      <Col md={9} style={{ paddingLeft: "0px" }}>
                        <div style={{ fontWeight: "bold" }}>
                          {user.user[0].name} {user.user[0].surname}
                        </div>
                        <div>
                          {connectedUser._id === user.from
                            ? `Vous: ${user.text.slice(0, 20)}`
                            : user.text.slice(0, 20)}
                          {user.text.length > 20 && "..."}
                        </div>
                        {user.read && (
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "#999",
                              position: "absolute",
                              top: "0",
                              right: "0",
                            }}
                          ></div>
                        )}
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "#999",
                            position: "absolute",
                            top: "0",
                            right: "40px",
                          }}
                        >
                          {getTimeDiff(user?.createdAt)}

                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </div>

            <div className="messenger-conversation">
              <div className="conversation-message">
                {selectedUser ? (
                  <div
                    className="messenger-message-list"
                    ref={messageListRef}
                    style={{
                      overflowY: "auto",
                      overflowX: "hidden",
                      height: "300px",
                      paddingRight: "10px",
                    }}
                  >
                    {messages.map((message, index) => {
                      if (
                        (message.from === selectedUser._id &&
                          message.to === profile._id) ||
                        (message.from === profile._id &&
                          message.to === selectedUser._id)
                      ) {
                        const isSender = message.from === profile._id;
                        const messageClass = isSender
                          ? "messenger-sender-message"
                          : "messenger-recipient-message";
                        const alignClass = isSender
                          ? "messenger-message-right"
                          : "messenger-message-left";
                        return (
                          <div
                            key={index}
                            className={`${messageClass} ${alignClass}`}
                          >
                            {message.text}
                         
                            <span style={{fontSize:'10px',  display: 'block'}}>{getTimeDiff(message.createdAt) }</span>
                          </div>
                          
                          
                        );
                      }
                      return null; // Add this to skip rendering if the message doesn't match the condition
                    })}
                    
                  </div>
                ) : (
                  <div className="messenger-no-conversation">
                    No conversation selected
                  </div>
                )}
              </div>
              {selectedUser && (
                <div className="messenger-message-input">
                  <input
                    type="text"
                    placeholder="Type your message here ..."
                    className="messenger-input"
                    value={messageInput}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendClick(e);
                      }
                    }}
                  />
                  <button
                    onClick={handleSendClick}
                    className="messenger-send-button "
                  >
                    <MdSend />
                  </button>
                  {/* <button className="messenger-send-button ">
                    <MdCall />
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
