Shopping Application – Full Stack (React with TypeScript + Node.js + MySQL + TailwindCSS)

A full-stack e-commerce shopping application built using
React (frontend), Node.js + Express (backend), MySQL (database), and TailwindCSS (UI styling).

This project includes complete shopping features for customers along with a secure Admin Panel for managing products and users.


✨ Features
User Features:

🔐 User authentication (Sign up, Login, Protected routes)
🛍️ Browse and search products by categories
⭐ View detailed product information with ratings
🛒 Shopping cart management with persistent storage
💳 Checkout and order placement
📋 Order history and order details tracking
👤 User profile management
Admin Features:

📊 Admin dashboard for product management
🏷️ Category management with hierarchical structure
📦 Product CRUD operations
📈 Manage product inventory
Technical Features:

🎨 Responsive design with Tailwind CSS
✅ Automated testing with Playwright
🔄 Context API for state management (Search, Cart, Orders, Auth)
💾 SQLite database for persistent data storage
🛠️ Tech Stack
Frontend:

React with TypeScript
Tailwind CSS
Playwright (Testing)
Backend:

Node.js with Express.js
SQLite Database
JWT Authentication

Database
MySQL
Sequelize / MySQL queries


⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Nirant-talware/Shopping-Application.git
cd Shopping-Application

2️⃣ Frontend Setup
cd e-com_frontend
npm install
npm start

App will run at:
http://localhost:3000

3️⃣ Backend Setup
cd e-com_backend
npm install
npm start

Backend will run at:
http://localhost:8080


🗃️ Database Setup (MySQL)
Install MySQL
Create a database (e.g. shopping_app)
Update DB credentials in backend config
Run backend so tables auto-generate OR import provided SQL file


🔐 Environment Variables

Create a .env file inside backend:

PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=shopping_app
JWT_SECRET=your_secret_key


📦 API Endpoints Overview

Auth
POST /register
POST /login
Products
GET /products
POST /products (Admin)
PUT /products/:id (Admin)
DELETE /products/:id (Admin)
Orders
POST /create-order
GET /orders/:userId
GET /order-details/:orderId

