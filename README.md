# Task Management System

## Overview
This is a full-stack Task Management System developed as part of a company assignment.  
The application allows users to register, log in securely, and manage their personal tasks.

The project focuses on clean architecture, authentication, and user-specific data handling.



## Features
- User Registration
- User Login with JWT Authentication
- Secure password hashing using bcrypt
- Add tasks
- View tasks specific to the logged-in user
- Show logged-in user name
- Logout functionality
- UI state management (hide login/register after login)


## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (Fetch API)

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Authentication & Security
- JSON Web Tokens (JWT)
- bcrypt for password hashing

---

## Project Structure

Task/

├─ backend/

│ ├─ src/

│ │ ├─ config/

│ │ ├─ controllers/

│ │ ├─ middleware/

│ │ ├─ routes/

│ │ ├─ app.js

│ │ └─ server.js

│ ├─ .env

│ └─ package.json

└─ frontend/

├─ index.html

├─ style.css

└─ script.js


## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);


### Task Table
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

Setup Instructions
Prerequisites

Node.js installed

MySQL installed and running

cd backend
npm install

### create .env file
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=taskdb
JWT_SECRET=your_secret_key

npm run dev
http://localhost:5000





### Application Behavior

Tasks are user-specific

Logged-in user sees only their own tasks

Login and Register forms are hidden after successful login

Logout clears session and resets UI





### Security Notes

Passwords are never stored in plain text

JWT is used for stateless authentication

Protected routes require a valid token




### Future Enhancements

Delete and edit tasks

Token persistence using localStorage

Task completion status

Improved UI styling

Pagination for tasks


###Scalability Note

The application can support more users by running multiple backend servers.
JWT authentication allows the system to scale without storing user sessions.
Database performance can be improved using indexing and connection pooling.
Caching can be added in the future to handle higher traffic smoothly.



## API Documentation
Postman Documentation:
https://documenter.getpostman.com/view/51384575/2sBXVfhr41



### Author

Developed as part of a company assignment to demonstrate full-stack development skills using Node.js, Express, and MySQL.
