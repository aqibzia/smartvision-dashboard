import express from 'express';
import multer from 'multer';
import { analyzeImage } from '../controllers/aiController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), analyzeImage);

export default router;
