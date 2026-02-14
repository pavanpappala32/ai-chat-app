const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();




const app = express();
app.use(cors());
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