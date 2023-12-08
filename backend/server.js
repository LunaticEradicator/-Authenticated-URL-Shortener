import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import user from "./data/user.js";

// env config
dotenv.config();

const port = process.env.port || 8080;
const app = express();

// working of frontend on backend [different server]
app.use(cors());

app.get("/api/user", (req, res) => {
  res.json(user);
});

app.get("/", (req, res) => {
  res.send("... Calling Api ..");
});

app.listen(port, () => {
  console.log(`Listening To Port : ${port}`);
});
