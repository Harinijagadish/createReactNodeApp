# createReactNodeApp
CRUD-REACT+NODE

Node.js MongoDB CRUD Operations with JWT Authentication
This project demonstrates how to create a simple Node.js API with MongoDB, JWT authentication, and CRUD operations for user management.

Requirements
Before running the application, make sure you have the following installed:

Node.js (version 12 or higher)
MongoDB (locally or using a service like MongoDB Atlas)
Setup Instructions

1. Clone the Repository
git clone https://github.com/your-username/node-mongo-jwt-crud.git
cd node-mongo-jwt-crud

2. Install Dependencies
Make sure you're in the project directory and run:

npm install

3. Create the .env File
Create a .env file in the root of the project directory. The .env file contains sensitive information like the MongoDB URI and JWT secret key.

touch .env


Here's a sample README.md file to help you set up a Node.js application that connects to MongoDB, performs CRUD operations, and implements JWT authentication. This guide assumes you're already familiar with basic Node.js, Express, and MongoDB concepts.

README.md
Node.js MongoDB CRUD Operations with JWT Authentication
This project demonstrates how to create a simple Node.js API with MongoDB, JWT authentication, and CRUD operations for user management.

Requirements
Before running the application, make sure you have the following installed:

Node.js (version 12 or higher)
MongoDB (locally or using a service like MongoDB Atlas)
Setup Instructions
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/node-mongo-jwt-crud.git
cd node-mongo-jwt-crud
2. Install Dependencies
Make sure you're in the project directory and run:

bash
Copy code
npm install
This will install all the required dependencies defined in the package.json file.

3. Create the .env File
Create a .env file in the root of the project directory. The .env file contains sensitive information like the MongoDB URI and JWT secret key.

bash
Copy code
touch .env
Add the following lines to the .env file:

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/your-database-name

# JWT Secret
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=3600 # JWT expiry time in seconds (1 hour)

# Port Number
PORT=3000









Screenshot attacheed belowfor reference:

![Screenshot 2025-01-15 173727](https://github.com/user-attachments/assets/6266fd9f-4aa0-4a20-ac9a-3f91ace00021)












