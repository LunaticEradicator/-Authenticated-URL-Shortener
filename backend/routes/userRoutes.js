import express from "express";
import { getAllUsers } from "../controller/userController.js";

const router = express.Router();

// User Authentication
router.get("/", getAllUsers);

export default router;
