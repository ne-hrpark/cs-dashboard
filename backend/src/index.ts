import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { initDatabase, closeDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import statsRoutes from './routes/stats.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS: 프론트엔드 도메인만 허용 (배포 시 origin 수정)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CORS_ORIGIN?.split(',') || ['https://your-domain.com']
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(helmet());

app.use(express.json());

// Rate limiting: 분당 100회
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', statsRoutes);

app.use(errorHandler);

async function start() {
  try {
    if (process.env.MOCK !== 'true') {
      await initDatabase();
      console.log('Database connected.');
    } else {
      console.log('Running with MOCK data (no database).');
    }
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

process.on('SIGTERM', async () => {
  if (process.env.MOCK !== 'true') await closeDatabase();
  process.exit(0);
});

start();
