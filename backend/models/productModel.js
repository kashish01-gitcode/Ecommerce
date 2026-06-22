import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: "Men",
    },
    subCategory: {
      type: String,
      default: "Topwear",
    },
    sizes: {
      type: [String],
      default: [],
    },
    image: {
      type: [String],
      default: [],
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;