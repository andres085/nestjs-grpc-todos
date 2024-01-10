# Microservices-Based Todo Management System

Welcome to my Microservices-Based Todo Management System, a project meticulously crafted for deepening my understanding of modern backend development techniques and microservices architecture. This system comprises two primary microservices:

**API Gateway (REST API):** This microservice, built using NestJs, serves as the entry point for client interactions. It handles user registrations, logins, and forwards requests related to todo management to the gRPC server. Its RESTful design ensures easy and familiar access for clients.

**gRPC Server:** Dedicated to todo management, this server is responsible for handling all operations related to todos, such as creation, retrieval, update, and deletion. Implemented using gRPC within NestJs, it offers efficient, type-safe, and scalable data exchange.

The database of choice for this project is Sqlite, known for its simplicity and effectiveness in handling data, especially in practice projects. This system is designed not only as a practical application of NestJs and gRPC in a microservices architecture but also as an exploration into effective data management and user authentication strategies using Sqlite.

## Project Setup

1- Clone the project from the repository

```bash
## With SSH
git clone git@github.com:andres085/nestjs-grpc-todos.git
```

```bash
## With HTTPS
git clone https://github.com/andres085/nestjs-grpc-todos.git
```

2- Install the dependencies

```bash
## With Yarn
yarn
```

```bash
## With NPM
npm i
```

3- Start the microservices in different terminals

```bash
## Terminal 1
yarn start:dev api-gateway
```

```bash
## Terminal 2
yarn start:dev todo-app
```

4- Endpoints

- POST: /users/register
- POST: /users/login
- GET: /users
- GET: /users/:id
- PATCH: /users/:id
- DELETE: /users/:id
- POST: /todos
- GET: /todos
- GET: /todos/:id
- PATCH: /todos/:id
- DELETE: /todos/:id

- User register body example:

  ```json
  {
    "username": "User",
    "password": "User123",
    "email": "user@mail.com"
  }
  ```

- User login body example:

  ```json
  {
    "password": "User123",
    "email": "user@mail.com"
  }
  ```

- Create Todo body example:

  ```json
  {
    "title": "Third todo"
  }
  ```

- Update Todo body example:

  ```json
  {
    "id": "5f69259a-d923-4524-a3ff-716273bc6a58",
    "title": "Second Todo Updated v2"
  }
  ```

## Technologies Used

- NestJs
- gRPC
- JWT
- TypeORM
- Sqlite

## Author

Andrés Martinez
