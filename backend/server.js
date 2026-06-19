import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

console.log("CLIENT_URL =", process.env.CLIENT_URL);
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// connect to MongoDB
connectDB();

// api routes
app.use("/api/user", userRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);
app.get("/", (req, res) => {
  res.send("API working ✅");
  
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
