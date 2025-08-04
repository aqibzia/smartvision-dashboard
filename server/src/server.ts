import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();
const app = express();

app.enable('trust proxy');
app.use((req, res, next) => {
  if (req.secure) return next();
  res.redirect('https://' + req.headers.host + req.url);
});

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
  }));
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
