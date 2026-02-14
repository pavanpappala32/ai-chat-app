const express = require('express');
const axios = require('axios');
const router = express.Router();

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1';

// Mock responses for testing
const mockResponses = [
    "That's an interesting question! I'd be happy to help you explore this topic.",
    "Great question! Here's what I think about that...",
    "I appreciate your message. Let me give you a thoughtful response.",
    "That's a fascinating point. Here's my perspective on it:",
    "Thanks for reaching out! I have some insights to share on this."
];

// Retry function with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (error.message.includes('429') || error.message.includes('quota')) {
                if (attempt === maxRetries - 1) throw error;
                
                const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
                console.log(`Quota exceeded, retrying in ${delay.toFixed(2)}ms (attempt ${attempt + 1}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
}

router.get('/', (req, res) => {
    res.json({ message: 'Chat API endpoint. Use POST /api/chat to send messages.' });
});

router.post('/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    
    try {
        console.log('Sending message to NVIDIA AI:', message);
        
        const generateResponse = async () => {
            const response = await axios.post(
                `${NVIDIA_BASE_URL}/chat/completions`,
                {
                    model: 'meta/llama3-8b-instruct',
                    messages: [
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1024,
                    stream: false
                },
                {
                    headers: {
                        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.choices[0].message.content;
        };
        
        const text = await retryWithBackoff(generateResponse, 3, 2000);
        
        res.json({ reply: text });
    } catch (error) {
        console.error('NVIDIA API Error:', error.message);
        
        // Use mock response if API error (rate limit, quota, etc.)
        if (error.response?.status === 429 || error.response?.status === 402 || error.message.includes('quota') || error.message.includes('rate limit')) {
            const mockReply = mockResponses[Math.floor(Math.random() * mockResponses.length)] + 
                              ` (Your question: "${message}")`;
            console.log('Using mock response due to API limit');
            return res.json({ reply: mockReply, isMock: true });
        }
        
        res.status(500).json({ 
            error: 'Error communicating with NVIDIA API',
            details: error.message
        });
    }
});

module.exports = router;