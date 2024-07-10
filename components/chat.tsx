// src/components/Chat.tsx

        import React, { useState, useEffect } from 'react';
        import axios from 'axios';

        const Chat = () => {
        const [messages, setMessages] = useState([]);
        const [newMessage, setNewMessage] = useState('');

        useEffect(() => {
        const fetchMessages = async () => {
        const response = await axios.get('/api/receiveMessages');
        setMessages(response.data.message);
        };

        fetchMessages();
        }, []);

        const sendMessage = async () => {
        await axios.post('/api/sendMessage', { user: 'User1', message: newMessage });
        setNewMessage('');
        };

        return (
<div>
    <div>
        {messages.map((msg, index) => (
        <div key={index}>
        <strong>{msg.user}</strong>: {msg.message}
    </div>
    ))}
</div>
<input
type="text"
value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        />
<button onClick={sendMessage}>Send</button>
        </div>
        );
        };

        export default Chat;
