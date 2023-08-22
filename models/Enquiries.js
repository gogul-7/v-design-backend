import mongoose from "mongoose";

const { Schema } = mongoose;

const EnquirySchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Enquiries = mongoose.model("enquiries", EnquirySchema);

export default Enquiries;
