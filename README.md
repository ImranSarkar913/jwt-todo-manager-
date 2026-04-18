# 🚀 JWT To-Do Manager API

A secure backend API for managing personal to-do tasks using JWT authentication.  
This project demonstrates authentication, authorization, and REST API design without using a database.

---

## ✨ Features

- 🔐 User Registration & Login
- 🔑 JWT Authentication
- 🛡️ Protected Routes
- 🔒 Password Hashing using bcrypt
- 📝 To-Do CRUD Operations (Create, Read, Update, Delete)
- ⚡ Lightweight (No Database)

---

## 🛠 Tech Stack

- Node.js
- Express.js
- JSON Web Token (JWT)
- bcrypt
- REST API

---

## 📌 API Endpoints

### 🔑 Auth Routes
- `POST /signup` → Create new user
- `POST /login` → Login user & get token

### 📝 To-Do Routes (Protected)
- `GET /todos` → Get all todos
- `POST /todos` → Add new todo
- `DELETE /todos/:id` → Delete todo

---

## 🔐 Authentication Flow

1. User signup or logs in
2. Server generates JWT token
3. Client sends token in headers:
4. Server verifies token before accessing protected routes

---

## ▶️ How to Run

```bash

npm install jsonwebtoken
node app.js
The server will start on http://localhost:3000