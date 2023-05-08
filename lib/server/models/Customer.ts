import { Schema, model, models } from "mongoose";
import Order from "./Order";

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phone: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

customerSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "customer",
});

models.Order = Order;
const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;
