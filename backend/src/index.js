import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import linksRouter from './routes/links.js';
import redirectRouter from './routes/redirect.js';
import { healthCheck } from './controllers/linkController.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN || 'http://localhost:3000', process.env.CORS_ORIGIN2 || 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  })
);

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
    message: 'Too many requests from this IP, please try again after 1 minute',
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

const frontendBuildPath = path.join(__dirname, '../../frontend/build');
app.use(express.static(frontendBuildPath));

app.get('/healthz', healthCheck);
app.use('/api/links', linksRouter);
app.use('/:code', redirectRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app };
