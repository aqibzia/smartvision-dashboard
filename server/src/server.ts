import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { globalLimiter } from './middleware/rateLimiter';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

app.use(globalLimiter);
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
