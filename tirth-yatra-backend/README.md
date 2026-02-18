# Jain Tirth Yatra Guide - Backend API

A production-ready backend service for managing and discovering Jain Tirths. Built with a focus on clean architecture, security, and scalability.

## 🚀 Features
- **MVC Architecture**: Clean separation of models, controllers, and routes.
- **JWT Authentication**: Secure user registration and login with encrypted passwords.
- **RBAC (Role-Based Access Control)**: 
    - **Public**: Can view and filter Tirths.
    - **Admin**: Can Create, Update, and Delete entries.
- **Advanced Querying**: Built-in **Pagination** and **Filtering** (by city/state).
- **Security Hardening**: Implemented `Helmet` for secure headers and `Express-Rate-Limit` to prevent brute-force attacks.
- **Global Error Handling**: Custom middleware for consistent JSON error responses.
- **Data Seeding**: One-command script to populate the database with 10 authentic Jain Tirths.

## 🛠️ Tech Stack
- **Node.js & Express**
- **MongoDB & Mongoose**
- **JWT & Bcryptjs**
- **Security**: Helmet, Express-Rate-Limit, CORS

## ⚙️ Local Setup Instructions

Follow these steps to run the project on your machine:

1. **Clone the repository**
   ```bash
   git clone <your-repo-link>
   cd tirth-yatra-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/tirth_yatra_db
   JWT_SECRET=your_secure_random_string
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```

4. **Seed the Database (Important)**
   
   I have included a seeder script with 10 authentic Jain Tirth locations. Run this to populate your local MongoDB:
   ```bash
   node seeder.js
   ```

5. **Start the Server**
   ```bash
   npm run dev
   ```
   
   The API will be live at `http://localhost:5000`.

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login & get JWT token

### Tirths
- `GET /api/tirths` - Get all Tirths (Supports `?page=1&limit=5` and `?city=...`)
- `GET /api/tirths/:id` - Get single Tirth details
- `POST /api/tirths` - Create Tirth (Admin only)
- `PUT /api/tirths/:id` - Update Tirth (Admin only)
- `DELETE /api/tirths/:id` - Delete Tirth (Admin only)

## 🧪 Testing

I have verified all routes using Postman. Screenshots of successful testing are included in the repository's `/screenshots` folder (or attached to the email).