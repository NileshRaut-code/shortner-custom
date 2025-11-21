FROM node:20-slim

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json* ./frontend/
COPY frontend/public ./frontend/public
COPY frontend/src ./frontend/src
COPY frontend/tailwind.config.js ./frontend/
COPY frontend/postcss.config.js ./frontend/

WORKDIR /app/frontend
RUN npm install
RUN npm run build

WORKDIR /app
COPY backend/package.json backend/package-lock.json* ./backend/
COPY backend/src ./backend/src
COPY backend/prisma ./backend/prisma

WORKDIR /app/backend
RUN npm install
RUN npx prisma generate

WORKDIR /app

EXPOSE 3000

CMD ["node", "backend/src/index.js"]
