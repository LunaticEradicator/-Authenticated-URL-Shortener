// npm
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// database
import connectDatabase from "./config/db.js";

// routes
import userRoutes from "./routes/userRoutes.js";
import shortUrlRoutes from "./routes/shortUrlRoutes.js";

// middleware
import { notFoundURL, errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config(); // dotenv config
connectDatabase(); // Connect MongoDB Database
const app = express();
const port = process.env.port;

// working of frontend on backend [different server]
app.use(cors());

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // cookie parser middleware

// routes
app.use("/api/users", userRoutes);
app.use("/api/shortUrl", shortUrlRoutes);

app.get("/", (req, res) => {
  res.send("... Calling Api ..");
});

// custom Middleware
app.use(notFoundURL);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening To Port : ${port}`);
});
