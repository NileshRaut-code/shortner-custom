FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

WORKDIR /app/frontend-cra
RUN npm install && npm run build

WORKDIR /app/backend
RUN npx prisma generate

WORKDIR /app

EXPOSE 3000

CMD ["node", "backend/src/index.js"]
