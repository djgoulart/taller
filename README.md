# Code Challenge
**Task:**  
Create a simple RESTful API using Node.js and Express that allows users to manage a list of tasks.  
Each task should have the following properties:

- **id (number)**: Unique identifier for the task  
- **title (string)**: Title of the task  
- **completed (boolean)**: Indicates whether the task is completed  

The API should support the following endpoints:

- `GET /tasks` - Retrieve all tasks  
- `POST /tasks` - Create a new task  
- `PUT /tasks/:id` - Update an existing task by ID  
- `DELETE /tasks/:id` - Delete a task by ID  

**Requirements:**  
- Use in-memory storage (an array) for tasks (no database required).  
- Validate incoming data for the `POST` and `PUT` requests.  
- Ensure that the API follows RESTful conventions.

---

## Challenge Solution
A **Node.js** application was built using **TypeScript** and the **Express** framework.  
This application implements a task management system (CRUD), separating logic into layers to demonstrate clean and organized architecture.

## About the Project
This application manages tasks, allowing you to **create**, **list**, **edit**, and **delete** (CRUD).  
Data storage is **in-memory** (i.e., there is no database persistence).  
The main goals of this project are:

- Organize a **software architecture** by separating responsibilities into **controllers**, **routes**, **repositories**, and **entities**.  
- Use **TypeScript** for static typing, improving maintainability and readability.  
- Provide **unit tests** built with **Vitest**, ensuring code quality and reliability.

## Architecture
- **Entities**: Holds the classes that represent business rules (for example, `Task`).
- **Repositories**: Stores and manages data, in this case using an in-memory repository (`InMemoryTaskRepository`).
- **Controllers**: Responsible for handling each request, invoking repositories, and returning HTTP responses.
- **Routes**: Maps API endpoints (e.g., `GET /tasks`, `POST /tasks`, etc.).

## Technology Stack
- **TypeScript**
- **Express.js**
- **Node.js**

## System Requirements
- **Node.js 22+**

### Installation Steps

1. **Clone the repository**:
```bash
git clone https://github.com/djgoulart/taller.git
```
2. **Install the dependencies**:
```bash
   pnpm install
```

3. **Copy the content of `.env.example` file to `.env`**
```bash
cp .env.example .env
```

4. **Start in development mode**
```bash
pnpm dev
```
5. The Express Server will start by default at **http://localhost:3333** 

## Tests
```bash
pnpm test
```