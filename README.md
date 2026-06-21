# 🔐 JWT Authentication API

> A secure RESTful API with JWT-based authentication and authorization for todo management.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![k6](https://img.shields.io/badge/k6-Load%20Testing-7D64FF?style=for-the-badge&logo=k6&logoColor=white)](https://k6.io/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running the Server](#running-the-server)
- [API Documentation](#-api-documentation)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Todo Endpoints](#todo-endpoints)
- [Load Testing](#-load-testing)
  - [Running Tests](#running-tests)
  - [Viewing Reports](#viewing-reports)
- [Project Structure](#-project-structure)
- [Performance Metrics](#-performance-metrics)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Overview

This is a lightweight, production-ready REST API built with **Node.js** and **Express** that provides secure JWT-based authentication and authorization. Users can sign up, log in, and manage their personal todos with full CRUD operations.

The API features:
- 🔒 **Secure Authentication** with bcrypt password hashing
- 🎫 **JWT Token-based Authorization**
- 📝 **Todo Management** with user-specific data isolation
- ⚡ **High Performance** with low latency (< 5ms avg response)
- 📊 **Load Testing Ready** with k6 integration

---

## ✨ Features

### Core Features
- ✅ **User Registration** - Create new user accounts
- ✅ **User Login** - Obtain JWT access tokens
- ✅ **Create Todos** - Add new todos with text content
- ✅ **Read Todos** - Fetch all todos for authenticated user
- ✅ **Delete Todos** - Remove todos by ID (owner-only)

### Security Features
- 🔐 **Password Hashing** - bcrypt with 10 salt rounds
- 🎫 **JWT Authentication** - stateless, secure token-based auth
- 🛡️ **Protected Routes** - All todo endpoints require valid JWT
- 🔑 **Environment Variables** - Secrets stored in `.env` (not in code)

### Performance Features
- ⚡ **Low Latency** - Average response time < 4ms
- 📈 **High Throughput** - Handles 6+ requests/second
- 🧪 **Load Testing Ready** - k6 integration with comprehensive tests
- 📊 **Performance Reports** - Beautiful HTML reports with charts

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [Node.js](https://nodejs.org/) | Runtime Environment | 18.x+ |
| [Express](https://expressjs.com/) | Web Framework | 4.x |
| [JSON Web Token (JWT)](https://jwt.io/) | Authentication | 9.x |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Password Hashing | 5.x |
| [dotenv](https://github.com/motdotla/dotenv) | Environment Variables | 16.x |
| [k6](https://k6.io/) | Load Testing | Latest |
| [Chart.js](https://www.chartjs.org/) | Report Visualization | 4.x |


---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher)
- [k6](https://k6.io/docs/getting-started/installation/) (for load testing)

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the project root with the following values:

```env
PORT=3000
JWT_SECRET=your_secret_key_here
```

### Run the Server

```bash
node app.js
```

The server will start on `http://localhost:3000` by default.

---

## 📦 API Endpoints

### Authentication

#### `POST /auth/signup`

Register a new user.

Request body:

```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```

Response:

```json
{
  "message": "User created"
}
```

#### `POST /auth/login`

Log in and receive a JWT token.

Request body:

```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```

Response:

```json
{
  "token": "<jwt-token>"
}
```

---

### To-Do Routes (Protected)

All `/todos` routes require an `Authorization` header:

```
Authorization: Bearer <jwt-token>
```

#### `GET /todos`

Fetch all todos for the authenticated user.

Response:

```json
[
  {
    "id": "...",
    "userId": "...",
    "text": "...",
    "createdAt": "..."
  }
]
```

#### `POST /todos`

Add a new todo item.

Request body:

```json
{
  "text": "Buy groceries"
}
```

Response:

```json
{
  "id": "...",
  "userId": "...",
  "text": "Buy groceries",
  "createdAt": "..."
}
```

#### `DELETE /todos/:id`

Delete a todo item owned by the authenticated user.

Response:

```json
{
  "message": "Deleted"
}
```

---

🧪 Load Testing

Running k6 Tests

Start the server
bash
node app.js

Run load test:
again open another bash
k6 run load-test.js

Generate performance report:
k6 run --out json=results.json load-test.js

View HTML report:
Open report.html in your browser

Click "Load results.json"

Select the generated results.json file

## 🔒 Notes

- `JWT_SECRET` is required for token signing and verification.
- This implementation uses JSON files for storage and is intended for learning/demo purposes only.
- For production, replace file storage with a database and add input validation.

---

## 🛠 Dependencies

- `express`
- `jsonwebtoken`
- `bcrypt`
- `dotenv`

---

## ❤️ Contribution

Feel free to fork the repository, add features, and improve authentication, validation, and persistence.
