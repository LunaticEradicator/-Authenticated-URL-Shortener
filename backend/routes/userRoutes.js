import express from "express";
import {
  getAllUsers,
  userLogin,
  userRegister,
  userLogout,
} from "../controller/userController.js";
import protectedMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// User Authentication
router.get("/", protectedMiddleware, getAllUsers);
router.post("/login", userLogin);
router.post("/", userRegister);
router.post("/logout", userLogout);

export default router;
