import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../db';

interface JwtPayload {
  id: number;
  email: string;
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true }
    });

    const user = newUser.rows[0];

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    res.status(201).json({ user, token });
  } catch (err: any) {
    console.error('❌ Register Error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await prisma.user.findUnique({ where: { email } });
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err: any) {
    console.error('❌ Login Error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(
      authHeader.split(' ')[1],
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    res.json({ user: decoded });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
