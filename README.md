# MERN Scraping Application

A professional, full-stack MERN application that scrapes top stories from Hacker News, provides user authentication, and allows personalized bookmarking of stories.

## 🚀 Features

### **Backend**
- **Web Scraper**: Automatically scrapes the top 10 stories from Hacker News on server start.
- **Manual Sync**: Triggerable API endpoint (`POST /api/scrape`) to refresh news.
- **Authentication**: Secure JWT-based registration and login system with bcrypt hashing.
- **Story APIs**: 
  - Paginated story feed with sorting by points (descending).
  - Single story retrieval.
  - Protected bookmark toggling (authenticated users only).
- **Data Integrity**: MongoDB upsert logic to prevent duplicate stories based on URLs.

### **Frontend**
- **Modern UI**: Clean, light-mode SaaS aesthetic built with Tailwind CSS.
- **State Management**: React Context API for global authentication and bookmark state synchronization.
- **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop.
- **Interactive Feed**: Real-time bookmark toggling, manual syncing, and external link access.
- **Protected Routes**: Secure Bookmarks page only accessible to logged-in users.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, Axios, React Router.
- **Backend**: Node.js, Express, Mongoose, Cheerio (Scraping), JWT (Auth), Bcryptjs.
- **Database**: MongoDB.

---

## 📡 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Create a new user account.
- `POST /api/auth/login` - Authenticate user and receive JWT.

### **Stories**
- `GET /api/stories` - Fetch all stories (supports `page` & `limit` params).
- `GET /api/stories/:id` - Fetch a single story by ID.
- `GET /api/stories/bookmarks` - Fetch bookmarked stories for the current user (Protected).
- `POST /api/stories/:id/bookmark` - Toggle bookmark status for a story (Protected).

### **Scraping**
- `POST /api/scrape` - Trigger a manual scrape of Hacker News.

### **System**
- `GET /api/health` - Check backend server status.

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_high_entropy_secret_key
NODE_ENV=development
```

*(Optional)* Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🏃 Getting Started

### **1. Clone the Repository**
```bash
git clone <your-repo-url>
cd <repo-name>
```

### **2. Setup Backend**
```bash
cd backend
npm install
npm start
```

### **3. Setup Frontend**
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Business logic
│   │   ├── middleware/  # Auth & security middleware
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Scraper & external logic
│   │   └── server.js    # Entry point
│   └── .env             # Backend secrets
└── frontend/
    ├── src/
    │   ├── api/         # Axios configuration
    │   ├── components/  # Reusable UI components
    │   ├── context/     # Auth state management
    │   ├── pages/       # Main application views
    │   └── routes/      # Frontend routing
    └── .env             # Frontend configuration
```

---

## 📜 Assignment Requirements Met

- [x] **Top 10 Hacker News Scraper**: Successfully extracts Title, URL, Points, Author, and Posted Time.
- [x] **Auto-Scrape**: Runs on server startup and via API.
- [x] **Authentication**: Secure JWT system for Register/Login.
- [x] **Story APIs**: Full CRUD for stories and bookmarks with sorting and pagination.
- [x] **Responsive UI**: High-end light mode design optimized for all devices.
- [x] **State Management**: Real-time sync between Home and Bookmarks pages.
- [x] **Code Quality**: Clean, scalable structure with NO hardcoded secrets or unused code.
