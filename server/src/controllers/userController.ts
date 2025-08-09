import { Request, Response } from "express";
import prisma from '../db';

export const getUserStats = async (req: Request, res: Response) => {
  try {
    // const userId = req.user.id;

    // const totalImages = await prisma.image.count({
    //   where: { userId },
    // });

    // const aiGenerated = await prisma.image.count({
    //   where: { userId, type: "ai" },
    // });

    // const uploads = await prisma.image.count({
    //   where: { userId, type: "upload" },
    // });

    // res.json({
    //   totalImages,
    //   aiGenerated,
    //   uploads,
    // });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Failed to fetch user stats" });
  }
};
