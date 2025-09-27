# MERN Authentication System

A full-stack authentication system built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It follows the **MVC architecture** on the backend, uses **JWT** for secure authentication, and integrates **Nodemailer** for email verification. The frontend is developed with **React (Vite, Material UI, Axios)** for a modern, responsive UI.

---

## 🚀 Features

* User registration with email & password
* Login with JWT-based authentication
* OTP / email verification via Nodemailer
* Secure password hashing with bcrypt
* Protected routes using JWT middleware
* Modern React frontend with Material UI
* SweetAlert2 & Toastify for UI alerts
* Logout and token management
* MVC architecture for clean backend structure

---

## 🛠 Tech Stack

**Frontend:**

* React (Vite)
* Material UI
* Axios
* React Router
* SweetAlert2 + React Toastify

**Backend:**

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT (JSON Web Token)
* Nodemailer
* Bcrypt.js

---

## 📂 Project Structure

```bash
project/
│── backend/
│   ├── controllers/   # Business logic
│   ├── models/        # Database schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth middleware
│   └── server.js      # App entry point
│
│── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Signup, Login, Dashboard
│   │   └── utils/       # API base URI, helpers
│   └── vite.config.js
│
└── README.md
```

---

## ⚡ Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies for backend & frontend:

   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

3. Create a `.env` file in **backend** with the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. Run the backend server:

   ```bash
   cd backend
   npm start
   ```

5. Run the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

---

## 🔑 Usage

* Open `http://localhost:5173` (default Vite port).
* Register a new user.
* Verify via email (if enabled).
* Login to access the protected dashboard.

---

## 📡 API Endpoints

### 🔹 Auth Routes

#### 1. Register User

**POST** `/api/signup`
Request Body:

```json
{
  "username": "JohnDoe",
  "email": "john@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully. Please verify your email."
}
```

---

#### 2. Login User

**POST** `/api/login`
Request Body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "token": "jwt_token_here",
  "message": "Login successful"
}
```

---

#### 3. Get User Profile (Protected)

**GET** `/api/me`
Headers:

```
Authorization: Bearer <jwt_token>
```

Response:

```json
{
  "success": true,
  "user": {
    "_id": "userId123",
    "username": "JohnDoe",
    "email": "john@example.com"
  }
}
```

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
