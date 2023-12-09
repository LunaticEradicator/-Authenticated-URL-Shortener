import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  shortUrl: {
    type: String,
    required: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

export default ShortUrl;
