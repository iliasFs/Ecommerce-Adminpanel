import prisma from "../lib/prisma";
import { Product, Cart, Payment, Favourite } from "@prisma/client";

class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    readonly password: string,
    public isAdmin: boolean,
    public favouriteList?: Product[],
    public favourite?: Partial<Favourite>,
    public Cart?: Partial<Cart>,
    public Payment?: Partial<Payment>
  ) {}

  static async create(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
  ): Promise<User> {
    const { id } = await prisma.user.create({
      data: {
        name,
        email,
        password,
        isAdmin,
      },
    });
    return new User(id, name, email, password, isAdmin);
  }

  // To update a user
  static async updateUser(
    id: number,
    updatedName: string,
    updatedEmail: string,
    updatedPassword: string,
    updatedAdminStatus:boolean,
  ) {
    const { name, email, password,isAdmin } = await prisma.user.update({
      where: { id },
      data: {
        name: updatedName,
        email: updatedEmail,
        password: updatedPassword,
        isAdmin: updatedAdminStatus
      },
    })
    return new User(id, name, email, password, isAdmin)
  }

  static async findAll(): Promise<User[]> {
    return await prisma.user.findMany({
      orderBy:{
        id:'asc'
      }
    });
  }

  static async finById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user === null) {
      throw new Error("User does not exist.");
    }
    const { name, email, password, isAdmin } = user;
    return new User(id, name, email, password, isAdmin);
  }
  static async finByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user === null) {
      throw new Error("User does not exist.");
    }
    const {id, name, password, isAdmin } = user;
    return new User(id, name, email, password, isAdmin);
  }

  static async delete(id: number) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

export default User;
