import orderModel from "../models/orderModel.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount } = req.body;

    const order = new orderModel({
      userId,
      items,
      amount,
    });

    await order.save();

    res.json({
      success: true,
      message: "Order placed successfully",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {

    const { userId } = req.body;

    const orders = await orderModel.find({ userId });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { placeOrder, getUserOrders };