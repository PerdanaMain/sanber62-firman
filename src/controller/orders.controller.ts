import { Response } from "express";
import { MongooseError, Types } from "mongoose";
import OrderDetail from "../services/orderDetails.service";
import OrderService from "../services/orders.service";
import ProductService from "../services/products.service";
import {
  IRequestWithUser,
  OrderItems,
  IPaginationQuery,
} from "../utils/interfaces";

class OrderController {
  async index(req: IRequestWithUser, res: Response) {
    try {
      const user = req.user;

      const { limit = 10, page = 1 } = req.query as unknown as IPaginationQuery;

      const orders = await OrderService.findAll(
        limit,
        page,
        user?.id ?? new Types.ObjectId()
      );

      res.status(200).json({
        status: true,
        message: "Success get all orders",
        data: orders,
      });
    } catch (error) {
      const err = error as MongooseError;
      res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  }

  async store(req: IRequestWithUser, res: Response) {
    try {
      const user = req?.user;
      const { grandTotal, status, orderItems } = req.body;

      const order = await OrderService.create({
        grandTotal,
        status,
        orderDetails: [],
        createdBy: user?.id ?? new Types.ObjectId(),
      });

      const orderDetails = await Promise.all(
        orderItems.map(async (item: OrderItems) => {
          // Update stok produk
          await ProductService.updateQty(item.productId, item.quantity);

          // Buat detail order
          return {
            order: order._id,
            product: item.productId,
            qty: item.quantity,
          };
        })
      );

      // Simpan orderDetails ke database
      await OrderDetail.insertMany(orderDetails);

      res.status(200).json({
        status: true,
        message: "Success create new order",
        data: order,
      });
    } catch (error) {
      const err = error as MongooseError;
      res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  }
}

export default new OrderController();
