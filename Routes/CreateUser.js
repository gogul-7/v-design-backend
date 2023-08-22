import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secureJwt = "MERN_Stack_Project_Series";

const userRouter = express.Router();

userRouter.post(
  "/createuser",
  body("email").isEmail(),
  body("password", "Incorrect Passsword").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secPass,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false, data: error });
    }
  }
);

userRouter.post(
  "/loginuser",
  body("email").isEmail(),
  body("password", "Incorrect Passsword").isLength({ min: 5 }),
  async (req, res) => {
    let email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid User" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!pwdCompare) {
        return res.status(400).json({ errors: "Invalid password" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, secureJwt);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

userRouter.get("/getuserdata", async (req, res) => {
  try {
    const userData = await User.find();
    res.json({ success: true, data: userData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching Users" });
  }
});

userRouter.delete("/deleteuser/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const architect = await User.findByIdAndDelete(_id);

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

export default userRouter;
