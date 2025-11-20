# Loyalty Card App

A full-stack application for managing loyalty cards, tracking points, and redeeming rewards. Built with modern web technologies and containerized for easy development.

## 🚀 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, TanStack Query, Orval (API Client)
- **Backend**: NestJS, Prisma ORM, Swagger/OpenAPI
- **Database**: PostgreSQL
- **Infrastructure**: Docker Compose

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## 🏁 Getting Started

### 1. Start the Database

Ensure Docker is running, then start the PostgreSQL container:

```bash
docker-compose up -d
```

### 2. Setup Backend

Navigate to the backend directory, install dependencies, and set up the database:

```bash
cd backend
npm install

# Create .env file (if not already present)
# DATABASE_URL="postgresql://user:password@localhost:5432/loyalty_db?schema=public"

# Run database migrations
npx prisma migrate dev --name init

# Start the backend server
npm run start:dev
```

The backend API will be available at `http://localhost:3000`.
Swagger documentation is available at `http://localhost:3000/api`.

### 3. Setup Frontend

Navigate to the frontend directory and start the development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be available at `http://localhost:5173`.

## ✨ Features

- **Manage Cards**: Create, update, and delete loyalty cards for different businesses.
- **Track Points**: Add points using a slider or simple increments.
- **Rewards**: Visual notification when a card reaches its target points.
- **Reset Points**: Easily reset points after redeeming a reward.
- **Dark Mode**: Fully supported dark mode interface.
- **Responsive Design**: Works seamlessly on desktop and mobile.

## 📝 API Documentation

The backend provides a full OpenAPI specification. You can view the interactive documentation at:
`http://localhost:3000/api`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
