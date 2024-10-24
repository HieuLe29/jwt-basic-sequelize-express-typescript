import { Request, Response } from "express";
import {User} from "../models";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({name: user.name, email: user.email});
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const token =jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
      res.json({ token });
      return;
    }

    res.status(400).json({ message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};