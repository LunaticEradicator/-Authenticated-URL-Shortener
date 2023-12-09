import express from "express";
import {
  createShortUrl,
  getAllShortUrl,
  getWorkingUrl,
} from "../controller/shortUrlController.js";

import protectedMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// short Url Route
router.post("/", protectedMiddleware, createShortUrl);
router.get("/:id", protectedMiddleware, getWorkingUrl); // correct Url

//! specific [implement later]
router.get("/", protectedMiddleware, getAllShortUrl);

export default router;
