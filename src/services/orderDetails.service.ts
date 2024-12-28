import { OrderDetail } from "../utils/interfaces";
import OrderDetailModel from "../models/orderDetails.model";

class OrderDetailService {
  async insertMany(data: OrderDetail[]): Promise<OrderDetail[]> {
    return await OrderDetailModel.insertMany(data);
  }
}

export default new OrderDetailService();
