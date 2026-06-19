import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    amount: Number,

    paymentStatus: {
      type: String,
      default: "Paid",
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;