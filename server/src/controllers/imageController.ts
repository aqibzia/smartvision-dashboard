// controllers/imageController.ts
import { Request, Response } from "express";
import prisma from '../db';

// POST /api/images/upload
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // const fileUrl = `/uploads/${req.file.filename}`; // or S3 URL in production

    // const newImage = await prisma.image.create({
    //   data: {
    //     url: fileUrl,
    //     type: "upload",
    //     userId: req.user.id,
    //   },
    // });

    // res.json(newImage);
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
};

// GET /api/images/recent
export const getRecentImages = async (req: Request, res: Response) => {
  try {
    // const images = await prisma.image.findMany({
    //   where: { userId: req.user.id },
    //   orderBy: { createdAt: "desc" },
    //   take: 10,
    // });

    // res.json(images);
  } catch (err) {
    console.error("Error fetching recent images:", err);
    res.status(500).json({ error: "Failed to fetch recent images" });
  }
};
