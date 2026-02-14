import { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (input.trim()) {
            // Add user message
            const userMessage = { user: 'You', text: input };
            setMessages([...messages, userMessage]);
            setInput('');
            setLoading(true);

            try {
                // Send to backend - hardcoded for production deployment
                const backendUrl = 'https://ai-chat-backend-7p3l.onrender.com';
                
                const response = await axios.post(`${backendUrl}/api/chat`, {
                    message: input
                });
                
                // Add AI response
                const aiMessage = { 
                    user: 'AI', 
                    text: response.data.reply,
                    isMock: response.data.isMock 
                };
                setMessages(prev => [...prev, aiMessage]);
            } catch (error) {
                console.error('Error:', error);
                const errorMessage = { user: 'AI', text: 'Sorry, error occurred.' };
                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            sendMessage();
        }
    };

    return (
        <div className="chat-container">
            <h1>AI Chat App</h1>
            <div className="messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.user}`}>
                        <strong>{msg.user}:</strong> {msg.text}
                        {msg.isMock && <span className="mock-indicator"> (Mock response - API quota exceeded)</span>}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={loading}
                />
                <button onClick={sendMessage} disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default Chat;
