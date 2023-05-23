import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";

const OrderController = {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { quantity, email, fullName, adress, phone, products } = req.body;
      const order = await Order.create(
        quantity,
        email,
        fullName,
        adress,
        phone,
        products
      );
      res.send(order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  async getAllOrders(_: Request, res: Response, next: NextFunction) {
    try {
      const products = await Order.get();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },
  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await Order.delete(parseInt(id));
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { quantity, email, fullName, adress, phone } = req.body;
      const order = await Order.put(
        parseInt(id),
        quantity,
        email,
        fullName,

        adress,
        phone
      );
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
};
export default OrderController;
