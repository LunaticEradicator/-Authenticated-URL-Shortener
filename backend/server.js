import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { notFoundURL, errorHandler } from "./middleware/errorHandler.js";
dotenv.config(); // dotenv config
connectDatabase(); // Connect MongoDB Database
const app = express();
const port = process.env.port || 8080;

// working of frontend on backend [different server]
app.use(cors());

// routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("... Calling Api ..");
});

// custom Middleware
app.use(notFoundURL);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening To Port : ${port}`);
});
