import mongoose from "mongoose";
import { OrderDetail } from "../utils/interfaces";

const Schema = mongoose.Schema;

const OrderDetailsSchema = new Schema<OrderDetail>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "orders",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
    qty: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderDetailModel = mongoose.model<OrderDetail>(
  "orderDetails",
  OrderDetailsSchema
);
export default OrderDetailModel;
