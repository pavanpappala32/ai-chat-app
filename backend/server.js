const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();




const app = express();

// CORS configuration for production
const corsOptions = {
    origin: [
        'http://localhost:5000', // Development
        'http://localhost:5173', // Development frontend
        'https://ai-chat-frontend-9doh.onrender.com' // Production frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(() =>console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));


const chatRoutes = require('./routes/chat');
app.use('/api', chatRoutes);



app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});