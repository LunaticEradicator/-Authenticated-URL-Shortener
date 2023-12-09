import mongoose from "mongoose";
// import shortid from "shortid";

const shortUrlSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  // shortUrl: {
  //   type: String,
  //   required: true,
  // },
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

export default ShortUrl;
