import express from "express";
import {
  createShortUrl,
  getWorkingUrl,
  getShortUrlOfUser,
} from "../controller/shortUrlController.js";

import protectedMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// short Url Route
router.post("/", protectedMiddleware, createShortUrl);
router.get("/:id", protectedMiddleware, getWorkingUrl); // correct Url

// specific url
router.get("/", protectedMiddleware, getShortUrlOfUser);

export default router;
