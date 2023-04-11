import mongoose from "mongoose";
import User from "./UserModel.js";

const JobSchema = mongoose.Schema({
  title: String,
  location: String,
  description: String,
  file: String,
  salary: Number,
  rating: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    value: { type: Number, default: 0 },
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {
  timestamps: true,
});

const Job = mongoose.model("Job", JobSchema);
export default Job;   