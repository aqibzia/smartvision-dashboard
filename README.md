# 🧠 SmartVision Dashboard

A secure, full-stack web application built for managing and visualizing AI-powered submicron imaging data. Designed for scientific research use cases where high-performance and real-time analysis are critical.

---

## 🌐 Tech Stack

### Frontend
- React + TypeScript
- HTML5, CSS3
- Responsive Design

### Backend
- Node.js + Express
- RESTful APIs
- TypeScript
- Prisma ORM
- JWT Auth + SSL + Encrypted Storage

### Database
- PostgreSQL (via Docker)
- Redis (caching) [coming soon]

### Auth/Security
- JWT
- Bcrypt
- CORS
- Rate-Limiting

### Visualization
- D3.js (2D analytics)
- Three.js / WebGL (3D point cloud support)

### DevOps
- Docker + Docker Compose
- CI/CD ready
- Deployable to AWS / GCP / Azure

---

## 🔒 Features

- 🔐 Secure user authentication with JWT
- 🧠 AI model integration (inference endpoint soon)
- 📊 Visualize structured 2D/3D imaging data
- ⚡ Fast image uploads + dataset management
- 🐳 Fully containerized with PostgreSQL backend
- PostgreSQL integration using Prisma ORM
- Modular TypeScript-based API

---

## 🚀 Getting Started

### 1. Clone & Setup
```bash
git clone https://github.com/your-username/smartvision-dashboard.git
cd smartvision-dashboard
cp .env.example .env  # then fill in JWT_SECRET and DB configs
```

### 2. Start with Docker

docker compose up --build

Frontend: http://localhost:5173
Backend: http://localhost:5000/api

| Method | Endpoint             | Protected | Description              |
| ------ | -------------------- | --------- | ------------------------ |
| POST   | `/api/auth/register` | ❌         | Register a new user      |
| POST   | `/api/auth/login`    | ❌         | Login & get JWT token    |
| GET    | `/api/auth/me`       | ✅         | Get user profile (token) |

### 🛠️ Prisma (Database ORM)
Run Migrations

```bash
npx prisma migrate dev --name init
```

Open Prisma Studio (GUI)

```bash
npx prisma studio
```



### ✨ ToDo Roadmap
✅  Set up secure auth (JWT, bcrypt)
✅  Docker + Gitpod dev setup
✅ PostgreSQL integration
Real-time AI model integration
Scientific image visualization (3D, point cloud)
Role-based access (admin/researcher)
Email notifications & password reset


### 🧑‍💻 Author
Md Aqib Zia
Full-Stack Developer | AI