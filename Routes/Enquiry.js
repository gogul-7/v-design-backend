import express from "express";
import Enquiries from "../models/Enquiries.js";
import { body, validationResult } from "express-validator";

const enqRouter = express.Router();

enqRouter.post("/postenquiry", body("email").isEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await Enquiries.create({
      email: req.body.email,
      name: req.body.name,
      message: req.body.message,
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: error });
  }
});

enqRouter.get("/getenquiry", async (req, res) => {
  try {
    const enqData = await Enquiries.find();
    res.json({ success: true, data: enqData });
  } catch (error) {
    res.json({ success: false });
    console.log(error);
  }
});

export default enqRouter;
