# Jain Tirth Yatra Guide - Backend API

A production-ready backend service for managing and discovering Jain Tirths. Built with Node.js, Express, and MongoDB.

## 🚀 Features
- **Authentication**: JWT-based login/register with password hashing (Bcrypt).
- **Role-Based Access Control (RBAC)**: Public users can view Tirths; only Admins can manage content.
- **Tirth Management**: Full CRUD (Create, Read, Update, Delete) functionality.
- **Advanced Querying**: Built-in pagination and filtering (e.g., filter by city/state).
- **Robust Error Handling**: Centralized middleware for clean, actionable error responses.
- **Data Integrity**: Schema-level validation using Mongoose.

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT, BcryptJS, CORS, Dotenv

## 📂 Project Structure
- `src/config`: Database connection setup.
- `src/models`: Data schemas for Users and Tirths.
- `src/controllers`: Business logic for handling requests.
- `src/routes`: API endpoint definitions.
- `src/middleware`: Security guards (Auth) and Error Handlers.

## ⚙️ Setup Instructions
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file with `MONGO_URI`, `JWT_SECRET`, and `PORT`.
4. (Optional) Run `node seeder.js` to populate sample data.
5. Start development: `npm run dev`.

## 📡 API Endpoints
- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`
- **Tirths (Public)**: `GET /api/tirths`, `GET /api/tirths/:id`
- **Tirths (Admin)**: `POST /api/tirths`, `PUT /api/tirths/:id`, `DELETE /api/tirths/:id`