# TaskFlow – Student Task Manager (Backend API)

Clean, beginner-friendly REST API backend built with **Node.js**, **Express**, and **MongoDB (Mongoose)** for CS students learning full-stack web development.

---

## 📁 Backend Folder Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection logic using Mongoose
├── controllers/
│   └── taskController.js     # Business logic for tasks & statistics
├── models/
│   └── Task.js               # Task schema definition & validations
├── routes/
│   └── taskRoutes.js         # REST API route declarations
├── middleware/
│   ├── errorMiddleware.js    # Centralized error handler
│   └── notFoundMiddleware.js # 404 Route Not Found handler
├── seed/
│   └── seedTasks.js          # Database seed script with 12 student tasks
├── .env                      # Environment variables
├── .env.example              # Environment variables template
├── .gitignore                # Git exclusions
├── package.json              # Project metadata, scripts, and dependencies
├── server.js                 # Express application entrypoint
└── README.md                 # API documentation & Postman guide
```

---

## ⚙️ Prerequisites & Setup

### 1. Install Node.js
Ensure Node.js (v18+) and npm are installed on your machine.
```bash
node -v
npm -v
```

### 2. MongoDB Setup
Ensure MongoDB is running locally on port `27017` or use a free MongoDB Atlas connection string.

**Windows MongoDB Service:**
```powershell
Get-Service -Name "*mongo*"
# If stopped, start it:
Start-Service -Name "MongoDB"
```

### 3. Install Backend Dependencies
Open a terminal in the `backend` folder and run:
```bash
cd backend
npm install
```

### 4. Environment Variables Configuration
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow_db
CLIENT_URL=http://localhost:5173
```

### 5. Seed the Database
Populate your MongoDB database with 12 realistic student tasks:
```bash
npm run seed
```

### 6. Start the Backend Server
Run with nodemon for auto-reload during development:
```bash
npm run dev
```
Or with standard Node:
```bash
npm start
```

Expected startup output:
```
MongoDB connected successfully
Server running on http://localhost:5000
```

---

## 📡 Complete REST API Endpoints & Postman Guide

### 1. Get All Tasks
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/tasks`
- **Optional Query Parameters:**
  - `?category=Coding`
  - `?priority=High`
  - `?completed=true`
  - `?search=react`
  - Combinations: `?category=Assignment&priority=High`
- **Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Tasks fetched successfully",
  "count": 12,
  "data": [
    {
      "id": "66fb1234567890abcdef1234",
      "title": "Complete Deep Learning Assignment",
      "description": "Finish Recurrent Neural Networks (RNN) in PyTorch notebook.",
      "category": "Assignment",
      "priority": "High",
      "dueDate": "2026-09-19",
      "dueTime": "17:00",
      "completed": false,
      "completedAt": null,
      "createdAt": "2026-09-19T14:15:00.000Z",
      "updatedAt": "2026-09-19T14:15:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Task By ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/tasks/:id`
- **Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Task fetched successfully",
  "data": {
    "id": "66fb1234567890abcdef1234",
    "title": "Complete Deep Learning Assignment",
    "description": "Finish Recurrent Neural Networks (RNN) in PyTorch notebook.",
    "category": "Assignment",
    "priority": "High",
    "dueDate": "2026-09-19",
    "dueTime": "17:00",
    "completed": false
  }
}
```

---

### 3. Create a New Task
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/tasks`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "title": "Learn React & Express Integration",
  "description": "Practice connecting React fetch calls to Express controllers",
  "category": "Coding",
  "priority": "Medium",
  "dueDate": "2026-09-20",
  "dueTime": "18:00"
}
```
- **Response Example (201 Created):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "66fb9876543210abcdef5678",
    "title": "Learn React & Express Integration",
    "description": "Practice connecting React fetch calls to Express controllers",
    "category": "Coding",
    "priority": "Medium",
    "dueDate": "2026-09-20",
    "dueTime": "18:00",
    "completed": false,
    "completedAt": null
  }
}
```

---

### 4. Update an Existing Task
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/tasks/:id`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "title": "Learn React & Express Integration (Updated)",
  "priority": "High",
  "dueTime": "20:00"
}
```
- **Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "66fb9876543210abcdef5678",
    "title": "Learn React & Express Integration (Updated)",
    "priority": "High",
    "dueTime": "20:00"
  }
}
```

---

### 5. Mark Complete / Incomplete (Toggle)
- **Method:** `PATCH`
- **URL:** `http://localhost:5000/api/tasks/:id/complete`
- **Headers:** `Content-Type: application/json` (Optional body: `{"completed": true}`)
- **Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Task marked as completed",
  "data": {
    "id": "66fb9876543210abcdef5678",
    "completed": true,
    "completedAt": "2026-09-19T14:30:00.000Z"
  }
}
```

---

### 6. Delete a Task
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/tasks/:id`
- **Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": "66fb9876543210abcdef5678"
  }
}
```

---

### 7. Task Statistics Summary (Dashboard)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/tasks/stats/summary`
- **Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Task summary statistics fetched successfully",
  "data": {
    "total": 12,
    "pending": 9,
    "completed": 3,
    "dueToday": 3,
    "completionRate": 25,
    "progressPercentage": 25
  }
}
```

---

### 8. Category Statistics
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/tasks/stats/categories`
- **Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Category statistics fetched successfully",
  "data": [
    { "category": "College", "total": 2, "completed": 1, "pending": 1 },
    { "category": "Assignment", "total": 2, "completed": 0, "pending": 2 },
    { "category": "Project", "total": 2, "completed": 0, "pending": 2 },
    { "category": "Coding", "total": 3, "completed": 1, "pending": 2 },
    { "category": "Personal", "total": 2, "completed": 1, "pending": 1 },
    { "category": "Exam", "total": 1, "completed": 0, "pending": 1 }
  ]
}
```

---

### 9. Weekly Productivity Analytics
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/tasks/stats/weekly`
- **Response Example (200 OK):**
```json
{
  "success": true,
  "message": "Weekly analytics fetched successfully",
  "data": [
    { "day": "Monday", "completed": 0 },
    { "day": "Tuesday", "completed": 1 },
    { "day": "Wednesday", "completed": 0 },
    { "day": "Thursday", "completed": 1 },
    { "day": "Friday", "completed": 1 },
    { "day": "Saturday", "completed": 0 },
    { "day": "Sunday", "completed": 0 }
  ]
}
```

---

## 🎓 50-Minute Webinar Full-Stack Architecture Flow

```
              ┌──────────────────────────────────────────────┐
              │           React Frontend (Vite)              │
              │  - User fills form in AddTaskModal.tsx       │
              │  - Button triggers addTask() in TaskContext  │
              └──────────────────────┬───────────────────────┘
                                     │
                             HTTP / JSON Request
                             POST /api/tasks
                                     │
                                     ▼
              ┌──────────────────────────────────────────────┐
              │           Express.js Server (Node)           │
              │  - server.js receives request                │
              │  - taskRoutes.js routes to taskController.js │
              └──────────────────────┬───────────────────────┘
                                     │
                               Mongoose Model
                              Task.create(...)
                                     │
                                     ▼
              ┌──────────────────────────────────────────────┐
              │             MongoDB Database                 │
              │  - Validates document fields                 │
              │  - Stores document permanently               │
              └──────────────────────┬───────────────────────┘
                                     │
                             JSON Response 201
                        { success: true, data: ... }
                                     │
                                     ▼
              ┌──────────────────────────────────────────────┐
              │            React Frontend Update             │
              │  - api.ts unwraps task                       │
              │  - TaskContext updates state                 │
              │  - UI immediately reflects new card & stats! │
              └──────────────────────────────────────────────┘
```
