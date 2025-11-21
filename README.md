# TinyLink - URL Shortener

A production-ready URL shortener application with React frontend and Node.js backend, deployed on a single domain.

## Features

- ✅ Create short links with custom codes (6-8 characters)
- ✅ Track click statistics and timestamps
- ✅ Redirect to original URLs
- ✅ Responsive React UI
- ✅ RESTful API
- ✅ Production-ready security

## Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: React + React Router
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Custom CSS
- **Security**: Helmet, CORS, Rate Limiting
- **Deployment**: Docker + Railway

## Prerequisites

- Node.js 20+
- PostgreSQL 12+
- npm or yarn

## Local Development

### 1. Setup

```bash
git clone <repo>
cd shortner-project
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend-cra
npm install
cd ..
```

### 3. Environment Setup

```bash
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/tinylink
PORT=3000
NODE_ENV=development
```

### 4. Database Setup

```bash
cd backend
npx prisma migrate dev
```

### 5. Run Development

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend-cra
npm start
```

Open `http://localhost:3000` in browser.

## API Endpoints

### Create Link
```
POST /api/links
Content-Type: application/json

{
  "target_url": "https://example.com/long/url",
  "custom_code": "mycode"  // optional
}

Response: 201
{
  "id": 1,
  "code": "abc123",
  "target_url": "https://example.com/long/url",
  "total_clicks": 0,
  "last_clicked": null,
  "created_at": "2024-01-01T00:00:00Z"
}
```

### List Links
```
GET /api/links

Response: 200
[...]
```

### Get Link Stats
```
GET /api/links/:code

Response: 200
{
  "id": 1,
  "code": "abc123",
  "target_url": "https://example.com/long/url",
  "total_clicks": 5,
  "last_clicked": "2024-01-02T12:30:00Z",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Delete Link
```
DELETE /api/links/:code

Response: 200
{ "message": "Link deleted" }
```

### Redirect
```
GET /:code

Response: 302 (redirect to target_url)
```

### Health Check
```
GET /healthz

Response: 200
{ "status": "ok" }
```

## Database Schema

```sql
CREATE TABLE "Link" (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(8) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  total_clicks INT DEFAULT 0,
  last_clicked TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(code)
);
```

## Deployment

### Docker

Build and run with Docker:

```bash
docker build -t tinylink-backend ./backend
docker run -p 3000:3000 --env-file .env tinylink-backend

docker build -t tinylink-frontend ./frontend
docker run -p 5173:5173 tinylink-frontend
```

### Railway

1. Connect your GitHub repo to Railway
2. Add PostgreSQL service
3. Set environment variables
4. Deploy

## Project Structure

```
shortner-project/
├── Dockerfile
├── railway.json
├── .env.example
├── .gitignore
├── README.md
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── db/
│   │   └── utils/
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
└── frontend-cra/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.js
    │   ├── api.js
    │   └── index.css
    └── package.json
```

## Code Rules

- Custom codes: 6-8 alphanumeric characters [A-Za-z0-9] (required)
- Conflict on duplicate code: 409 response
- Deleted link redirect: 404 response
- All timestamps in UTC

## Pages

- **`/`** - Dashboard (create links, view all links)
- **`/code/:code`** - Link statistics page
- **`/:code`** - Redirect to target URL (302)

## License

MIT
