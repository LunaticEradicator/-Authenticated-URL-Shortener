import jwt from "jsonwebtoken";

export default function createToken(res, userId) {
  //json web token
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "4d",
  });

  //saving jwt in cookie
  res.cookie("jwt", token, {
    http: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 4 * 24 * 60 * 60 * 1000, // 4days
  });
}
