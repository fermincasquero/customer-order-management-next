import { Schema, model, models } from "mongoose";
import Customer from "./Customer";

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
    dateOrdered: { type: String, required: true },
    dateCompleted: { type: String },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

if (models.Customer) {
  models.Customer = Customer;
}
const Order = models.Order || model("Order", orderSchema);

export default Order;
