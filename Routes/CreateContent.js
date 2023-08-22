import express from "express";
import { body, validationResult } from "express-validator";
import Architects from "../models/Architects.js";
import Astrologer from "../models/Astrologers.js";
import cloudinary from "../cloudinary/index.js";

const contentRouter = express.Router();

contentRouter.post(
  "/createarchitect",
  body("email").isEmail(),
  async (req, res) => {
    const file = req.files.files;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    cloudinary.uploader.upload(
      file.tempFilePath,
      async (uploadErr, uploadRes) => {
        if (uploadErr) {
          console.log("Upload error:", uploadErr);
          return res
            .status(500)
            .json({ success: false, message: "Upload error" });
        }

        try {
          await Architects.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            rate: req.body.rate,
            image: uploadRes.url,
          });
          return res.json({
            success: true,
            message: "Architect created successfully",
          });
        } catch (error) {
          console.log("Database error:", error);
          return res
            .status(500)
            .json({ success: false, message: "Database error" });
        }
      }
    );
  }
);

contentRouter.get("/getarchitects", async (req, res) => {
  try {
    const architects = await Architects.find();
    res.json({ success: true, data: architects });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching architects" });
  }
});

contentRouter.put(
  "/updatearchitect/:id",
  body("email").isEmail(),
  async (req, res) => {
    const id = req.params.id;
    const file = req.files?.files;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let updateData = {
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        rate: req.body.rate,
      };

      if (file) {
        cloudinary.uploader.upload(
          file.tempFilePath,
          async (uploadErr, uploadRes) => {
            if (uploadErr) {
              console.log("Upload error:", uploadErr);
              return res
                .status(500)
                .json({ success: false, message: "Upload error" });
            }

            updateData.image = uploadRes.url;

            try {
              await Architects.findByIdAndUpdate(id, updateData);
              return res.json({
                success: true,
                message: "Architect updated successfully",
              });
            } catch (error) {
              console.log("Database error:", error);
              return res
                .status(500)
                .json({ success: false, message: "Database error" });
            }
          }
        );
      } else {
        try {
          await Architects.findByIdAndUpdate(id, updateData);
          return res.json({
            success: true,
            message: "Architect updated successfully",
          });
        } catch (error) {
          console.log("Database error:", error);
          return res
            .status(500)
            .json({ success: false, message: "Database error" });
        }
      }
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ success: false, message: "Error" });
    }
  }
);

contentRouter.delete("/deletearchitect/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const architect = await Architects.findByIdAndDelete(_id);

    if (!architect) {
      return res
        .status(404)
        .json({ success: false, message: "Architect not found." });
    }

    return res.json({
      success: true,
      message: "Architect deleted successfully",
    });
  } catch (error) {
    console.log("Database error:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
});

contentRouter.post(
  "/createastrologer",
  body("email").isEmail(),
  async (req, res) => {
    const file = req.files.files;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    cloudinary.uploader.upload(
      file.tempFilePath,
      async (uploadErr, uploadRes) => {
        if (uploadErr) {
          console.log("Upload error:", uploadErr);
          return res
            .status(500)
            .json({ success: false, message: "Upload error" });
        }

        try {
          await Astrologer.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            rate: req.body.rate,
            image: uploadRes.url,
          });
          return res.json({
            success: true,
            message: "Astrologer created successfully",
          });
        } catch (error) {
          console.log("Database error:", error);
          return res
            .status(500)
            .json({ success: false, message: "Database error" });
        }
      }
    );
  }
);

contentRouter.get("/getastrologers", async (req, res) => {
  try {
    const astrologers = await Astrologer.find();
    res.json({ success: true, data: astrologers });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching astrologer" });
  }
});

contentRouter.put(
  "/updateastrologer/:id",
  body("email").isEmail(),
  async (req, res) => {
    const id = req.params.id;
    const file = req.files?.files;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let updateData = {
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        rate: req.body.rate,
      };

      if (file) {
        cloudinary.uploader.upload(
          file.tempFilePath,
          async (uploadErr, uploadRes) => {
            if (uploadErr) {
              console.log("Upload error:", uploadErr);
              return res
                .status(500)
                .json({ success: false, message: "Upload error" });
            }

            updateData.image = uploadRes.url;

            try {
              await Astrologer.findByIdAndUpdate(id, updateData);
              return res.json({
                success: true,
                message: "Astrologer updated successfully",
              });
            } catch (error) {
              console.log("Database error:", error);
              return res
                .status(500)
                .json({ success: false, message: "Database error" });
            }
          }
        );
      } else {
        try {
          await Astrologer.findByIdAndUpdate(id, updateData);
          return res.json({
            success: true,
            message: "Astrologer updated successfully",
          });
        } catch (error) {
          console.log("Database error:", error);
          return res
            .status(500)
            .json({ success: false, message: "Database error" });
        }
      }
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ success: false, message: "Error" });
    }
  }
);

contentRouter.delete("/deleteastrologer/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const architect = await Astrologer.findByIdAndDelete(_id);

    if (!architect) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    return res.json({
      success: true,
      message: "Astrologer deleted successfully",
    });
  } catch (error) {
    console.log("Database error:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
});

export default contentRouter;
