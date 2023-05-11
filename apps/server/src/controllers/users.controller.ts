import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const userController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, isAdmin } = req.body;
      if (name === undefined || password === undefined) {
        throw new Error("Missing parameters: username");
      }
      const hashPassword = bcrypt.hashSync(password, salt);

      const newUser = await User.create(name, email, hashPassword, isAdmin);
      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  },
};
