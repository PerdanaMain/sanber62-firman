import { Order } from "../utils/interfaces";
import OrderModel from "../models/orders.model";
import { Types } from "mongoose";

class OrderService {
  async findAll(
    limit: number = 10,
    page: number = 1,
    userId: Types.ObjectId
  ): Promise<Order[]> {
    return await OrderModel.find({
      createdBy: userId,
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate("createdBy")
      .populate("orderDetails");
  }
  async create(data: Order): Promise<Order> {
    return await OrderModel.create(data);
  }
}

export default new OrderService();
