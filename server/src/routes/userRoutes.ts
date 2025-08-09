import express from "express";
import { getUserStats } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/stats", authMiddleware, getUserStats);

export default router;
