import mongoose from "mongoose";

const { Schema } = mongoose;

const ImageSchema = new Schema({
  ImageId: {
    type: String,
    unique: true,
    required: true,
  },
  imageUrls: {
    type: Array,
  },
});

const Image = mongoose.model("image_collection", ImageSchema);

export default Image;
