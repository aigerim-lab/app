# 🛡️ Secure Task Management Application

This is a secure and interactive task management web application built using Node.js, Express, EJS (Embedded JavaScript Templates), MongoDB Atlas (or local MongoDB), and JWT-based authentication. The application allows users to register, log in, create, view, and manage tasks with role-based access control.

## ✨ Features
- ✅ User Registration & Login with password hashing (bcrypt).
- 🔐 JWT Authentication for secure access to routes.
- 🏆 Role-based Access Control (Admin/User).
- 📝 Task CRUD operations (Create, Read, Delete tasks).
- 🖥️ EJS templates for dynamic content rendering.
- 🛡️ Protected Routes with JWT middleware.
- 🗄️ MongoDB integration (Atlas or Local).

## 🛠️ Tech Stack
- **Backend:** 🟢 Node.js, 🚀 Express
- **Database:** 🗄️ MongoDB Atlas / Local MongoDB
- **Templating Engine:** 📄 EJS
- **Authentication:** 🔑 JWT, 🔄 bcrypt
- **Validation:** 🧼 express-validator

## ⚙️ Project Setup

### 1. 🧑‍💻 Clone the repository
```
git clone <https://github.com/aigerim-lab/app>
cd <Assignment_4_K.Aigerim>
```

### 2. 📦 Install Dependencies
```
npm install
```

### 3. ⚙️ Configure Environment Variables
Create a `.env` file in the root directory and set the following variables:
```
PORT=3000
MONGO_URI=mongodb+srv://2303girls:serikbai10@cluster0.85exa.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=supersecretjwtkey123456

```


### 4. 🚀 Start the Server
```
node app.js
```
The application will run on `http://localhost:3000`

## 🔗 Endpoints

### 🔐 Authentication
- **GET /auth/register** - Registration page
- **POST /auth/register** - Register a new user
- **GET /auth/login** - Login page
- **POST /auth/login** - Login and get JWT token

### 📝 Tasks
- **GET /tasks** - View tasks (requires JWT token)
- **GET /tasks/create** - Form to create a new task
- **POST /tasks/create** - Create a task (requires JWT token)
- **DELETE /tasks/:id** - Delete a task (Admin only, requires JWT token)

## 📝 Usage
1. **Register a User:** Navigate to `http://localhost:3000/auth/register` and fill in the form.
2. **Login:** Navigate to `http://localhost:3000/auth/login` and log in to get a JWT token.
3. **Access Tasks:** Use Postman or any HTTP client:
   - Include `Authorization: Bearer <token>` in the request headers.
   - Access `http://localhost:3000/tasks` to view tasks.
   - Post a new task to `http://localhost:3000/tasks/create` with `title` and `description`.
4. **Admin Actions:**
   - Admins can delete tasks using the DELETE method: `http://localhost:3000/tasks/:id`.

## 🧑‍💻 Middleware
- **JWT Authentication:** Validates JWT tokens for protected routes.
- **Role Authorization:** Admin-specific actions.

## 🖼️ Screenshots
- 📝 Registration Page
- 🔐 Login Page
- 📋 Task List Page
- 📬 Postman Requests

## 🧪 Sample .env File
```
PORT=3000
MONGO_URI=mongodb+srv://2303girls:serikbai10@cluster0.85exa.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=supersecretjwtkey123456

```

## 📦 Dependencies
- express
- ejs
- mongoose
- dotenv
- bcrypt
- jsonwebtoken
- express-validator

## ✍️ Author
- Koszhanova Aigerim



