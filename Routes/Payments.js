import Razorpay from "razorpay";
import express from "express";
import * as dotenv from "dotenv";
import crypto from "crypto";
import UserPayments from "../models/Userpayment.js";

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

const paymentRouter = express.Router();

paymentRouter.post("/createorderid", async (req, res) => {
  var options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  try {
    const order = await instance.orders.create(options);

    const paymentData = {
      useremail: req.body.email,
      amount: req.body.amount,
      orderId: order.id,
      servicename: req.body.name,
      category: req.body.category,
      success: null,
      paymentId: null,
    };

    const payment = new UserPayments(paymentData);
    payment.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
  }
});
paymentRouter.post("/paymentverification", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    res.redirect(
      `https://v-design0.netlify.app/bookingsuccess?reference=${razorpay_payment_id}`
    );
    const filter = { orderId: req.body.razorpay_order_id };
    const update = {
      success: isAuthentic,
      paymentId: razorpay_payment_id,
    };

    const updatedPayment = await UserPayments.findOneAndUpdate(filter, update, {
      new: true,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

paymentRouter.get("/myorderdata", async (req, res) => {
  try {
    const orderData = await UserPayments.find();
    res.json({ success: true, data: orderData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching orderData" });
  }
});

export default paymentRouter;
