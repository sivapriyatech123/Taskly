# 🚀 Taskly - Smart Task Management System

A modern full-stack task management web application that helps users organize and track their daily tasks efficiently. Taskly provides secure authentication and personalized dashboards, allowing each user to manage their own tasks independently.

---

# 🛠️ Tech Stack

## Frontend
- Angular 22
- TypeScript
- HTML5
- CSS3

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL

## Authentication
- JWT (JSON Web Token)
- bcryptjs

## Deployment
- Render

---

# 📖 Project Description

Taskly is designed to simplify task management through a secure and user-friendly interface. The system allows users to create accounts, log in securely, and maintain their own personalized list of tasks.

Each user has separate tasks, ensuring privacy and secure task management.

---

# 🏠 Home Page

The Home Page acts as the entry point of the application. It provides navigation to Sign In, Sign Up, and Dashboard pages.

### Purpose
- Introduces the application.
- Provides smooth navigation.
- Enhances user experience.

## Screenshot

![Home Page](images/home-page.png)

---

# 📝 Sign Up Page

The Sign Up page allows new users to register by providing:

- Username
- Email
- Password

Authentication is included before accessing the dashboard to maintain a proper website flow and ensure that multiple users can have separate accounts and tasks.

### Features

- User Registration
- Email Validation
- Password Encryption
- Secure Account Creation

## Screenshot

![Sign Up Page](images/signup-page.png)

---

# 🔐 Sign In Page

The Sign In page allows registered users to log in securely.

### Features

- Secure Login
- JWT Authentication
- Session Management
- Protected Access

## Screenshot

![Sign In Page](images/signin-page.png)

---

# 📊 Dashboard Page

The Dashboard is the core page of the application where users manage their tasks.

---

## Task Overview

Displays task information and overall progress.

### Screenshot

![Dashboard Image 1](images/dashboard1.png)

---

## Task Creation

Users can add tasks with:

- Task Title
- Description
- Due Date
- Priority

### Screenshot

![Dashboard Image 2](images/dashboard2.png)

---

## Task Management

Users can:

- View Tasks
- Update Tasks
- Delete Tasks
- Mark Tasks as Completed

### Screenshot

![Dashboard Image 3](images/dashboard3.png)

---

## Task Organization

Tasks can be categorized and managed efficiently.

### Screenshot

![Dashboard Image 4](images/dashboard4.png)

---

# 🗄️ Database Design

PostgreSQL is used to store user and task information securely.

---

## User Table

Stores registered user information.

### Fields

- id
- username
- email
- password

### Screenshot

![User Table](images/user-table.png)

---

## Task Table

Stores task information for individual users.

### Fields

- id
- title
- description
- due_date
- priority
- status
- user_id

### Screenshot

![Task Table](images/task-table.png)

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- User-specific Task Management

---

# 🌐 Deployment

## Frontend

https://taskly-frontend-link.onrender.com

## Backend

https://taskly-backend-link.onrender.com

---

# ✨ Conclusion

Taskly is a secure and efficient task management application developed to help users organize their daily activities. The system provides authentication, personalized dashboards, and task management capabilities, making it a practical solution for improving productivity.

---

## 👨‍💻 Developed By

**Siva Priya N**

Master of Computer Applications (MCA)

Madras Christian College, Chennai

---
⭐ If you like this project, give it a star!
