# 💸 Real-Time Expense Tracker

A sleek and responsive web application built with the MERN stack that allows users to track their expenses in real time. It features CRUD operations, interactive visualizations, and a modern UI powered by Material UI.

---

## 🚀 Features

- 🔐 Secure login system (future scope)
- 📋 Add, edit, and delete transactions
- 📅 Choose transaction dates with a date picker
- 🧾 View all transactions in a dynamic table
- 📊 **Real-time expense graph visualization**
- ✅ Snackbar notifications for actions (submit, update, delete)
- 🌐 Responsive UI with Material UI components
- ⚙️ Backend API with Node.js, Express, and MongoDB

---

## 📈 Real-Time Graph

Visualize your spending trends dynamically. As you add or delete transactions, the graph updates instantly to reflect the latest totals and trends over time.

- Weekly/Monthly breakdowns
- Total vs category-based views (if implemented)
- Built using charting libraries like **Recharts** or **Chart.js**

![Graph Screenshot](./assets/graph.png)

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Material UI (MUI)
- Day.js
- React Router DOM
- **Recharts** or **Chart.js** (for graphs)

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas (via Mongoose)

---


---

## 🧑‍💻 Getting Started

### Prerequisites
- Node.js
- MongoDB (Atlas or local)

### Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/daksh1821/Real-time-Expense-tracker.git
   cd real-time-expense-tracker
Install client dependencies:
cd client
npm install

Install server dependencies:
cd ../server
npm install

Setup environment variables:

Create a .env file in the server/ folder
MONGO_URI=your_mongodb_connection_string
PORT=4000

Start the backend:
nodemon server.js

Start the Frontend:
npm start

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| GET    | `/transactions`     | Get all transactions  |
| POST   | `/transactions`     | Add a new transaction |
| PATCH  | `/transactions/:id` | Update a transaction  |
| DELETE | `/transactions/:id` | Delete a transaction  |


📦 Future Improvements
Google OAuth / JWT Authentication

Monthly/yearly analytics & charts

Export data to CSV or PDF

Dark mode toggle

Transaction categories and filters

📄 License
This project is open source and available under the MIT License.

🙌 Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

💻 Author
Daksh Jain
https://www.linkedin.com/in/daksh-jain-5620b5251/



