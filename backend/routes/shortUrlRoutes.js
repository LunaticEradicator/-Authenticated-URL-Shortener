import express from "express";
import {
  createShortUrl,
  getAllShortUrl,
  getWorkingUrl,
} from "../controller/shortUrlController.js";

const router = express.Router();

// short Url Route
router.post("/", createShortUrl);
router.get("/:id", getWorkingUrl); // correct Url

//! specific [implement later]
router.get("/", getAllShortUrl);

export default router;
