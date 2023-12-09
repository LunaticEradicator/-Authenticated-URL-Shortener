import ShortUrl from "../models/ShortUrl.js";
import asyncHandler from "../middleware/asyncHandler.js";
import shortid from "shortid";
import validUrl from "valid-url";

//? @desc  create ShortUrl
// @route  post/api/shortUrl
// @access private
const createShortUrl = asyncHandler(async (req, res) => {
  const { longUrl } = req.body;
  const createShortId = shortid.generate();

  // end case
  // each user can have same link
  // if the url does not  exist in the database for that particular user
  const urlExist = await ShortUrl.findOne({
    user: req.user._id,
    longUrl: longUrl,
  });

  if (urlExist) {
    res.status(400);
    throw new Error("URl Already Exist");
  }

  // only if the user entered URl data  [longUrl] is valid
  // create a new model
  // send a response
  if (validUrl.isUri(longUrl)) {
    // Creating a new shortUrl
    const newShortUrl = await ShortUrl.create({
      user: req.user._id,
      shortUrl: createShortId,
      longUrl: longUrl,
    });
    if (newShortUrl) {
      res.status(201).json({
        _id: newShortUrl._id,
        user: newShortUrl._id,
        shortUrl: newShortUrl.shortUrl,
        longUrl: newShortUrl.longUrl,
      });
    } else {
      res.status(400);
      throw new Error("Invalid ShortUrl Data");
    }
  } else {
    res.status(400);
    throw new Error("Please Submit a Working Url");
  }
});

//? @desc  get correctUrl of the shortUrl
// @route  get/api/shortUrl/:id
// @access private
const getWorkingUrl = asyncHandler(async (req, res) => {
  try {
    const workingUrl = await ShortUrl.findOne({ shortUrl: req.params.id });
    if (workingUrl) {
      return res.redirect(workingUrl.longUrl);
    } else {
      return res.status(404).json("Url Not Found");
    }
  } catch (error) {
    return res.status(500).json("Server Error");
  }
});

//? @desc  get ShortUrl
// @route  get/api/shortUrl
// @access private
const getAllShortUrl = asyncHandler(async (req, res) => {
  const shortUrlsOfParticularUser = await ShortUrl.find({ user: req.user._id });
  if (shortUrlsOfParticularUser) {
    res.status(200).json(shortUrlsOfParticularUser);
  } else {
    res.status(404).json("ShortUrl Not Found");
  }
});

export { createShortUrl, getAllShortUrl, getWorkingUrl };
