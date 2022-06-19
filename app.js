import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import facultyRoute from "./routes/faculty.js";
import galleryRoute from "./routes/gallery.js";
import authRoute from "./routes/auth.js";
import connectToDatabase from "./database/connect.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

connectToDatabase();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());

app.use("/faculty", facultyRoute);
app.use("/gallery", galleryRoute);
app.use("/auth", authRoute);

export const PORT = process.env.PORT || 3000;
export default app;
