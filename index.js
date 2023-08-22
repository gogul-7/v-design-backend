import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";
import userRouter from "./Routes/CreateUser.js";
import contentRouter from "./Routes/CreateContent.js";
import imageRouter from "./Routes/CreateImage.js";
import fileUpload from "express-fileupload";
import paymentRouter from "./Routes/Payments.js";
import session from "express-session";
import enqRouter from "./Routes/Enquiry.js";

dotenv.config();

const app = express();
const PORT = 8080 || process.env.PORT;
app.use(
  session({
    secret: "46875643548974489_78_97987",
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      _expires: 360000000,
      originalMaxAge: null,
      httpOnly: true,
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

const startSever = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => console.log(`App has started on server ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

app.use("/api", userRouter);
app.use("/api", contentRouter);
app.use("/api", imageRouter);
app.use("/api", paymentRouter);
app.use("/api", enqRouter);

startSever();
