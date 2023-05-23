import prisma from "../lib/prisma";
import Product from "./Products";
interface Order {
  quantity: number;
  email: string;
  fullName: string;
  adress: string;
  phone: string;
}

class Order {
  constructor(
    public quantity: number,
    public email: string,
    public fullName: string,
    public adress: string,
    public phone: string,
    public idArr: string
  ) {}
  static async create(
    quantityNew: number,
    emailNew: string,
    fullNameNew: string,
    adressNew: string,
    phoneNew: string,
    idArr: string
  ) {
    const { quantity, email, fullName, adress, phone, products } =
      await prisma.order.create({
        data: {
          quantity: quantityNew,
          email: emailNew,
          fullName: fullNameNew,
          adress: adressNew,
          phone: phoneNew,
          products: idArr,
        },
      });
    return new Order(quantity, email, fullName, adress, phone, products);
  }
  static async get() {
    const orders = await prisma.order.findMany();
    return orders;
  }
  static async delete(id: number) {
    const order = await prisma.order.delete({
      where: { id },
    });
    return order;
  }
  static async put(
    id: number,
    quantityNew: number,
    emailNew: string,
    fullNameNew: string,
    adressNew: string,
    phoneNew: string
  ) {
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        quantity: quantityNew,
        email: emailNew,
        fullName: fullNameNew,
        adress: adressNew,
        phone: phoneNew,
      },
    });
    return order;
  }
}
export default Order;
