import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const UserController = {
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

  async findAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await User.finById(parseInt(id));
      if (!user) {
        throw new Error("Non existent user");
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw new Error("User not found");
      }
      const user = await User.delete(parseInt(userId));
      res
        .status(301)
        .json({ message: " User deleted successfully", data: user });
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
