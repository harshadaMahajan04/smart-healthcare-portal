# Smart Healthcare Portal

A full-stack MERN web application that allows users to input symptoms and receive intelligent health recommendations.

## Live Demo
- **Frontend:** https://smart-healthcare-portal-f54f-aw4uj4san.vercel.app/
- **Backend API:** https://smart-healthcare-portal-o5w9.onrender.com

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Auth:** JWT (JSON Web Tokens) + bcrypt
- **Deployment:** Vercel (frontend) · Render (backend)

## Features
- User registration and login with JWT authentication
- Protected routes — dashboard and symptom checker require login
- Symptom checker with 40+ symptoms across 7 categories
- Rule-based health recommendation engine
- Full symptom history saved per user in MongoDB
- Delete individual symptom records
- Responsive UI with mobile hamburger menu
- Toast notifications and skeleton loading states
- Global error boundary for crash recovery

## Local Development

### Backend
cd server
npm install
# create .env with MONGO_URI, JWT_SECRET, JWT_EXPIRE, CLIENT_URL
npm run dev

### Frontend
cd client
npm install
# create .env with VITE_API_URL=http://localhost:5000/api
npm run dev
