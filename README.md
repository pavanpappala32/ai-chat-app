# AI Chat App

A full-stack AI chat application built with React (frontend) and Node.js/Express (backend) that integrates with AI APIs for conversational responses.

## Features

- Real-time chat interface
- AI-powered responses using NVIDIA API
- Automatic retry logic with exponential backoff for API quota handling
- Mock response fallback when API limits are reached
- Responsive design with modern UI
- MongoDB integration for data persistence

## Tech Stack

### Frontend
- React 18
- Vite
- CSS3
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- NVIDIA AI API integration
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- NVIDIA API key (get from https://build.nvidia.com/)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-chat-app
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create environment files:

**Backend (.env):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NVIDIA_API_KEY=your_nvidia_api_key
```

## Running Locally

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Deployment

### Backend Deployment (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add environment variables in Render dashboard
6. Deploy

### Frontend Deployment (Render Static Site)
1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Set the build command: `npm run build`
4. Set the publish directory: `dist`
5. Deploy

## API Endpoints

- `GET /api/` - API status
- `POST /api/chat` - Send chat message

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `MONGO_URI` | MongoDB connection string | Yes |
| `NVIDIA_API_KEY` | NVIDIA AI API key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the ISC License.