import { Request, Response } from 'express';

export const analyzeImage = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

  // Simulate AI processing
  const fakeResult = {
    message: 'AI analysis complete',
    filename: req.file.originalname,
    description: 'Detected objects: Cat, Sofa',
  };

  return res.json(fakeResult);
};
