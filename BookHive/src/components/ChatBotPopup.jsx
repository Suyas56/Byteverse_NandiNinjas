import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaRobot, FaTimes } from 'react-icons/fa';
import '../ChatBotPopup.css';

const apiKey = import.meta.env.VITE_API_KEY;

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSend = async () => {
    if (!userMessage.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userChat = {
      id: Date.now(),
      type: 'user',
      message: userMessage,
      time: timestamp,
    };

    // Immediately update UI with the user's message and a placeholder for AI response.
    setChats((prevChats) => [
      ...prevChats,
      userChat,
      {
        id: `${userChat.id}_ai`,
        type: 'ai',
        message: '...',
        time: timestamp,
      },
    ]);
    setUserMessage('');
    setIsLoading(true);

    try {
      // Gemini API endpoint with your API key. Make sure to secure your API key in production!
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [{ text: userMessage }],
            },
          ],
        }
      );
      
      // The Gemini API returns candidates; we extract the first candidate's text.
      const aiMessage =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'I am sorry, I cannot process that right now.';

      // Update the AI response in the chat list.
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === `${userChat.id}_ai` ? { ...chat, message: aiMessage } : chat
        )
      );
    } catch (error) {
      console.error('Chatbot API error:', error);
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === `${userChat.id}_ai`
            ? { ...chat, message: 'Error: Unable to retrieve response.' }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
      // Scroll to bottom when new messages are added.
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Allow sending message on Enter press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Scroll to bottom on new chat messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <>
      <button className="chatbot-toggle-btn" onClick={togglePopup} aria-label="Open Chatbot">
        <FaRobot size={24} />
      </button>

      <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <FaRobot size={20} className="header-icon" />
            <span>Chat with Bot</span>
          </div>
          <button className="close-btn" onClick={togglePopup} aria-label="Close Chatbot">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="chatbot-body">
          {chats.length === 0 ? (
            <div className="welcome-message">Hello! Ask me anything.</div>
          ) : (
            chats.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.type}`}>
                <div className="message-box">
                  <ReactMarkdown>{chat.message}</ReactMarkdown>
                </div>
                <span className="chat-time">{chat.time}</span>
              </div>
            ))
          )}
          <div ref={scrollRef}></div>
        </div>

        <div className="chatbot-footer">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            aria-label="Message Input"
          />
          <button onClick={handleSend} disabled={isLoading} className="send-btn">
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatbotPopup;
