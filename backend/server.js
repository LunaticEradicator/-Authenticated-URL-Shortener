// npm
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
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
const port = process.env.port || 8080;
const __dirname = path.resolve();

// working of frontend on backend [different server]
app.use(cors());

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // cookie parser middleware

// routes
app.use("/api/users", userRoutes);
app.use("/api/shortUrl", shortUrlRoutes);

if (process.env.NODE_ENV === "production") {
  // set static folder for frontend build
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  // any routes that is not api will be redirected to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("... Calling Api ..");
  });
}

// custom Middleware
app.use(notFoundURL);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening To Port : ${port}`);
});
