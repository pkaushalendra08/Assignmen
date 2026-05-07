# Web Scrapper 

## Project Structure

### Backend (`/backend`)
- `config/`: Configuration files (DB, etc.)
- `controllers/`: Request handlers
- `middleware/`: Custom middleware
- `models/`: Database schemas
- `routes/`: API route definitions
- `services/`: Business logic
- `utils/`: Utility functions
- `server.js`: Entry point
- `app.js`: Express app configuration

### Frontend (`/frontend`)
- `api/`: Axios instances and API calls
- `components/`: Reusable components
- `context/`: React context for state management
- `pages/`: Page-level components
- `routes/`: Routing logic
- `App.jsx`: Main app component
- `main.jsx`: Entry point

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. **Backend**
   ```bash
   cd backend
   npm install
   # Create .env file based on .env.example
   npm run dev
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   # Create .env file based on .env.example
   npm run dev
   ```

## Configuration
- Backend runs on port 5000
- Frontend runs on port 5173
