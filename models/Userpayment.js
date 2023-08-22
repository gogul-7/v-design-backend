import mongoose from "mongoose";

const { Schema } = mongoose;

const UserPayment = new Schema({
  useremail: {
    type: String,
  },
  category: {
    type: String,
  },
  servicename: {
    type: String,
  },
  amount: {
    type: String,
  },
  orderId: {
    type: String,
  },
  success: {
    type: Boolean,
  },
  paymentId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserPayments = mongoose.model("userpayment", UserPayment);

export default UserPayments;
