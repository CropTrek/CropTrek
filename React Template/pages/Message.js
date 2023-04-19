import Head from "next/head";
import { useState, useEffect,useCallback, useRef } from "react";
import Slider from "react-slick";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import { logoSlider } from "../src/sliderProps";
import { get, set } from "local-storage";
import io from "socket.io-client";
import AccessDach from "./AccessDach";

export default function Message() {
  const socket = io.connect("http://localhost:5002");

  socket.on("connect", () => {
    console.log("Connected to server");
  });
  const messageListRef = useRef(null);

  const [connectedUser, setConnectedUser] = useState(null);
  const profile = get("profile");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
    fetch("http://localhost:5000/api/users")
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
      }  }, [selectedUser]);
  useEffect(() => {
    if(connectedUser){
    fetch('http://localhost:5000/api/users/messages/'+profile._id)
          .then(response => response.json())
      .then(messages => setMessages(messages))
      .catch(error => console.error(error));
    }
  }, []);
  const handleSearch = (event) => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    // Listen for 'receiveMsg' event emitted from the server
    socket.on("receiveMsg", (message) => {
      setMessages( message);
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      } 
     
    });
  
    // Clean up the event listener when component unmounts
    return () => {
      socket.off("receiveMsg");
    };
  }, [socket]);
  
  const handleSendClick = useCallback((event) => {
    event.preventDefault();
    if (!messageInput || !selectedUser) {
      return;
    }
  
    const message = {
      from: profile._id,
      to: selectedUser._id,
      text: messageInput,
    };
   
 
      
  
    // Emit the message to the server
    socket.emit("sendMsg", message);
    setMessageInput("");
   
  }, [messageInput, selectedUser, socket]);

  return (<>
    {!connectedUser && <AccessDach/> }
{connectedUser && 
    <Layout>

      <div className="messenger-container">
        <div className="messenger-user-list">
          
          <div className="messenger-user-scroll-panel">
            <input
              type="text"
              placeholder="Search"
              className="messenger-search-input"
              onChange={handleSearch}
            />
          {filteredUsers.filter((user) => user._id !== profile._id).map((user) => (
            
  <div
    key={user.id}
    className={`messenger-user ${
      selectedUser && user._id === selectedUser.id ? "selected" : ""
    }`}
    onClick={() => handleUserClick(user)}
    style={{ cursor: "pointer" }}
  >
    {user.email}
  </div>
))}

          </div>
        </div>

        <div className="messenger-conversation">
        {selectedUser && selectedUser.name ? <h4>{selectedUser.name}</h4> : ""}

<div className="conversation-message">
    {selectedUser ? (
     <div className="messenger-message-list"  ref={messageListRef}>
      {console.log(messages)}
     {
               

     messages.map((message, index) => {
       if (
         (message.from === selectedUser._id && message.to === profile._id) ||
         (message.from === profile._id && message.to === selectedUser._id)
       ) {
         const isSender = message.from === profile._id;
         const messageClass = isSender
           ? "messenger-sender-message"
           : "messenger-recipient-message";
         const alignClass = isSender
           ? "messenger-message-right"
           : "messenger-message-left";
         return (
           <div key={index} className={`${messageClass} ${alignClass}`}>
             {message.text}
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
    <div className="messenger-message-input">
      <input
        type="text"
        placeholder="Type your message here"
        className="messenger-input"
        value={messageInput}
        onChange={handleChange}
      />
      <button onClick={handleSendClick} className="messenger-send-button ">
        Send
      </button>
    </div>
  
  </div>
  </div>
  </Layout>}
</>
  );
}
