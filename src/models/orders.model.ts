import mongoose from "mongoose";
import { Order } from "../utils/interfaces";

const Schema = mongoose.Schema;

const OrdersSchema = new Schema<Order>(
  {
    grandTotal: {
      type: Schema.Types.Number,
      required: true,
    },
    orderDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: "orderDetails",
        default: [],
      },
    ],
    status: {
      type: [Schema.Types.String],
      enum: ["pending", "completed", "cancelled"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<Order>("orders", OrdersSchema);
export default OrderModel;
