import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: {
      type: [{ name: String, count: Number }],
    },
    dateOrdered: { type: Date, required: true },
    dateCompleted: { type: Date, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Order = models.Order || model("Order", orderSchema);

export default Order;
