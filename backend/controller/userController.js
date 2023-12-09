import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js"; // middleware for try catch [ syntactic sugar]
import bcrypt from "bcrypt";
import createToken from "../utils/createToken.js";

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

//? @desc  User Login & get tokens
// @route  POST/api/users/login
// @access public
const userLogin = asyncHandler(async (req, res) => {
  //   res.send("User Logged In");
  //   console.log(req.body);
  const { password, email } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    createToken(res, userExist._id);
    res.status(200).json({
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//? @desc  User Register
// @route  POST/api/users
// @access public
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Base Case
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("Email Already In Use");
  }

  //  Creating new User [Register]
  const newUser = await User.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10), // encrypt password to the database
  });

  if (newUser) {
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//? @desc User Logout
// @route  POST/api/users/logout
// @access public
const userLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json("User Logout Successfully");
});
export { getAllUsers, userLogin, userLogout, userRegister };
