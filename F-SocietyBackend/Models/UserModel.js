import mongoose from "mongoose";
const roles = ["user", "farmer", "job seeker", "admin"];

const userschema = mongoose.Schema(
  {
    name: {
      type: String,
       require: [true, "Pleaser add your name"],
    },
    surname: {
      type: String,
      require: [true, "Pleaser add surname"],
    },

    email: {
      type: String,
      require: [true, "Pleaser add email"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      require: [true, "Pleaser add password"],
    },
    accStatus: {
      type: Boolean,
      default: false,
    },
    role: {
        type: String,
        enum: roles,
        default: "user",
        validate: {
          validator: function(value) {
            return roles.includes(value);
          },
          message: props => `${props.value} is not a valid role`
        }
      },
    dateOfBirth: { type: Date },
    createdAt: { type: Date, default: Date.now },
    profilePhoto: {type: String }, 
    pendingDeletion: {
      // variable boolean bech tebe3 tafsikh l compte
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userschema);
export default User;
