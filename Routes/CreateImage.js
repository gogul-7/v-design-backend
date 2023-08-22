import express from "express";
import multer from "multer";
import Image from "../models/Images.js";
import cloudinary from "../cloudinary/index.js";
import bodyParser from "body-parser";
import path from "path";

const imageRouter = express.Router();

bodyParser.urlencoded({ extended: true });
bodyParser.json();

imageRouter.post("/uploadimages", async (req, res) => {
  try {
    const images = req.files.files;

    const imageUrls = [];
    let existingImage = await Image.findOne({ ImageId: req.body.imageId });

    if (!existingImage) {
      existingImage = new Image({ ImageId: req.body.imageId, imageUrls: [] });
    }

    for (const image of images) {
      const uploadRes = await cloudinary.uploader.upload(image.tempFilePath);

      if (!uploadRes) {
        console.log("Upload error:", uploadRes);
        return res
          .status(500)
          .json({ success: false, message: "Upload error" });
      }

      imageUrls.push(uploadRes.url);
    }

    const combinedImageUrls = [...existingImage.imageUrls, ...imageUrls];

    existingImage.imageUrls = combinedImageUrls;
    await existingImage.save();

    return res.status(201).json({
      success: true,
      message: "Images uploaded successfully.",
      imageUrls: combinedImageUrls,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

imageRouter.get("/getuploadedimages/:imageId", async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const image = await Image.findOne({ ImageId: imageId });

    if (!image) {
      return res.status(404).json({ error: "Image not found." });
    }
    res.status(200).json({ imageUrls: image.imageUrls });
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default imageRouter;
