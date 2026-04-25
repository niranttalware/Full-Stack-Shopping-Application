Shopping Application – Full Stack (React with TypeScript + Node.js + MySQL + TailwindCSS)

A full-stack e-commerce shopping application built using
React (frontend), Node.js + Express (backend), MySQL (database), and TailwindCSS (UI styling).

This project includes complete shopping features for customers along with a secure Admin Panel for managing products and users.


🚀 Features

⭐ Customer Features
🏠 Home Page – Displays all products from all categories
🛒 Shop Page – Browse category-wise products
Electronics → Smartwatches, Laptops, Earphones, Accessories & Gadgets
MensWear → Casual, Western, Jackets, Traditional, Shoes
🔍 Product Details Page – View full product details
🛍️ Add to Cart – Add, increase, decrease, remove products
💳 Checkout Page – Place order with address & payment
📦 Your Orders Page – Display all placed orders
🚚 Order Details Page – Shows full order tracking information
👤 Profile Page – User info + order history

⭐ Admin Features
Admin panel opens only with Admin Credentials
📊 Admin Dashboard
Total users
Total products
📦 Manage Products
Add Product
Edit Product
Delete Product
View all products
👥 Manage Users
View all users
Delete users



🗄️ Tech Stack

Frontend
React.js
React Router
Axios
TailwindCSS
Context API / State Management

Backend
Node.js
Express.js
JWT Authentication
Bcrypt / Password hashing

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

