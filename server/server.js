import express from "express";
import cors from "cors";
import keyboardRouter from "./routes/keyboard.routes.js";
import keycapRouter from "./routes/keycap.routes.js";
import userRouter from "./routes/user.routes.js";
import "./config/mongoose.config.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
const port = 8000;

app.use(cookieParser());
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

app.use(express.static("public"));

const rootRouter = new express.Router();
rootRouter.use("/api/keyboards", keyboardRouter);
rootRouter.use("/api/keycaps", keycapRouter);
rootRouter.use("/api/users", userRouter);
app.use(rootRouter);

app.listen(port, () => console.log(`The server is all fired up on ${port}`));
