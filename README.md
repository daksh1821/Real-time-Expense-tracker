# 💰 Real-time Expense Tracker (MERN)

A full-stack real-time expense tracker built with the MERN stack (MongoDB, Express, React, Node.js). The app features JWT-based authentication, dynamic charts, monthly summaries, and full CRUD operations for managing your transactions.

## 🚀 Live Demo

- 🌐 **Frontend**: [https://expense-tracker-frontend-<your-app>.onrender.com](https://expense-tracker-frontend-<your-app>.onrender.com)
- ⚙️ **Backend API**: [https://expense-tracker-backend-<your-api>.onrender.com](https://expense-tracker-backend-<your-api>.onrender.com)

---

## 📌 Features

- 🔐 JWT authentication with Passport.js (Login/Register)
- 🧾 Add, edit, delete, and view transactions
- 📊 Interactive charts with total expenses
- 📆 Monthly grouping using MongoDB Aggregation
- 📱 Responsive UI built with Material-UI (MUI)
- 🔁 Real-time state updates using Redux
- 🌈 Clean and user-friendly design

---

## 🏗️ Tech Stack

### 🔹 Frontend
- React.js
- Redux Toolkit
- React Router
- Material UI

### 🔹 Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Passport.js + JWT

---

## 🔧 Installation

### 1. Clone the repo

```bash
git clone https://github.com/daksh1821/Real-time-Expense-tracker.git
cd Real-time-Expense-tracker
```

2.Setup Backend
```
cd server
npm install
```
Create .env file in server/:
```
JWT_SECRET=your_jwt_secret
MONGO_DB_USERNAME=your_username
MONGO_DB_PASSWORD=your_password
MONGO_DB_URL=cluster.mongodb.net
```

Update your MongoDB URI in database/mongodb.js:
```
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URL}/?retryWrites=true&w=majority`;
```
Start Backend
```
nodemon server.js
```
3. Setup Frontend
```
cd ../client
npm install
npm start
```

🌐 Deployment
✅ Backend: Render (Node service)
Set Build Command: npm install

Set Start Command: node server.js

Add environment variables from .env

✅ Frontend: Render (Static site)
Set Build Command: npm run build

Set Publish directory: client/build

Add a rewrite rule:
Source: /*
Type: Rewrite
Destination: /index.html

✍️ Author
Daksh Jain
@daksh1821





