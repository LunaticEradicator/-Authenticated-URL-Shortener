import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

const protectedMiddleware = asyncHandler(async (req, res, next) => {
  // get the jwt from cookie
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET); // decode jwt  => give an object with payload [_id]
      req.user = await User.findById(decoded.userId).select("-password"); // userId from token without password
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Cookie Found, But Failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

export default protectedMiddleware;
