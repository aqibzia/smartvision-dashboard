import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { globalLimiter } from './middleware/rateLimiter';

dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Allow all origins or specify your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(globalLimiter);
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
