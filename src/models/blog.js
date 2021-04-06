const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  {
    // Created_at otomatis
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogPost", BlogPostSchema);
