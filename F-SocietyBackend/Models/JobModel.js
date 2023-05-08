import mongoose from "mongoose";

const JobSchema = mongoose.Schema({
  title: String,
  location: String,
  description: String,
  file: String, 
  salary: Number,
  employees: Number,
  rating:[{
    user: { type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    value : {type : Number, default: false}
  }],
  appliers:[{
    applier: { type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    apply : {type : Boolean, default: false}
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  preferences:[{
    user: { type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  }]
}, {
  timestamps: true,
});

const Job = mongoose.model("Job", JobSchema);
export default Job;   