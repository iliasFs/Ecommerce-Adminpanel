import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import atob from 'atob'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../lib/constant";


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
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params
      const { name, email, password, isAdmin } = req.body;
      if (name === undefined || password === undefined) {
        throw new Error("Missing parameters: username");
      }
      const hashPassword = bcrypt.hashSync(password, salt);

      const updatedUser = await User.updateUser(parseInt(id),name, email, hashPassword, isAdmin);
      console.log(updatedUser)
      res.status(200).json(updatedUser);
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

  // login users authentication
  async loginUser(req:Request, res: Response, next: NextFunction){
    try{
      // get the user provided email and password
      const initialAuth = req.headers.authorization?.split(' ')[1]
      console.log(initialAuth)
      // ensure that it is provided
      if(!initialAuth) throw new Error('No auth headers')
      const [email,password] = atob(initialAuth).split(':')
      // fetch user based on the provided email
      console.log(email,password)
      const user = await User.finByEmail(email)
    
      if(!user.password)  throw new Error('No user password in the databsae')
      // compare the user provided password with the one stored in the database
      const correctPassword = bcrypt.compareSync(password,user.password )
      if(!correctPassword) throw new Error('Incorrect Password')
      if(!JWT_SECRET) throw new Error('JWT_SECRET is missing')
      // if everything is okay, give the user a token
      // FOR NOW, I ommitted the third argument which is the expiring time
      const token = jwt.sign({sub:user.id, user}, JWT_SECRET) 
      res.status(200).json({id: user.id, user: user.name, email: user.email, token })
    }catch(error){
      next(error)
    }
    
  },

  // next to get the authenticated user (authorization)
  async getAuthenticatedUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(req.user)
    } catch (err) {
      next(err)
    }
  },
};

export default UserController;
