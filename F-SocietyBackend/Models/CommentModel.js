import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  comment:String,
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {
  timestamps: true,
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;   