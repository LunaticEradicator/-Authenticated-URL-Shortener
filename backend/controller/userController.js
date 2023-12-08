import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js"; // middleware for try catch [ syntactic sugar]

//? @desc  all users
// @route  GET/api/users/
// @access private
const getAllUsers = asyncHandler(async (req, res) => {
  // remove the password when data from database
  const users = await User.find({}).select("-password");
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("Cannot Find Users");
  }
});

export { getAllUsers };
