# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Here is a complete README.md file that will guide you through setting up and running the backend (Node.js with MongoDB) and frontend (React) with JWT authentication and CRUD operations.

markdown
Copy code
# Full-Stack Node.js, MongoDB & React CRUD Application with JWT Authentication

This project demonstrates how to create a full-stack application using **Node.js**, **MongoDB**, and **React**. The backend supports **CRUD operations** with JWT **authentication**. The frontend provides a simple interface for managing users.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **React** (v17 or higher)
- **npm** (or **yarn**)
  
## 1. Backend Setup (Node.js + MongoDB)

### 1.1 Install Dependencies

1. Create a new directory for your backend:
   mkdir node-backend
   cd node-backend
Initialize a new Node.js project:

npm init -y
Install necessary dependencies:

npm install express mongoose cors dotenv jsonwebtoken bcryptjs
1.2 Create .env File
In the root directory, create a .env file to store environment variables:

TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvd2RhbUBnbWFpbC5jb20iLCJpYXQiOjE3MDU0MTU1MjZ9.zkCUe9qE-LPRpDbKUJ95U7XEqNi0jmh1KUx0Cqcl22g
BASE_URL=http://localhost:3000

NOTE : Just to use authentication purpose
