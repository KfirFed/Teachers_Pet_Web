import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  image: String,
  senderId: {
    type: String,
    required: true,
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    default: [],
  },
});

const postModel = mongoose.model("Posts", postSchema);

export default postModel;
