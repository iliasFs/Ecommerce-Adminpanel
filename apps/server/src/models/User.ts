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

  static async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
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
    return new User(id, name, email, "", isAdmin);
  }

  static async delete(id: number) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

export default User;
