import mongoose from "mongoose";

const { Schema } = mongoose;

const ArchitectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Architects = mongoose.model("architect", ArchitectSchema);

export default Architects;
