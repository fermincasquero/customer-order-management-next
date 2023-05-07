import { Schema, model, models } from "mongoose";

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

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;
