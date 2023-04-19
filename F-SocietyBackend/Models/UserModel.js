import mongoose from "mongoose";
const roles = ["user", "farmer", "jobSeeker", "admin","supplier"];

const userschema = mongoose.Schema(
  {
    name: {
      type: String,
      // require: [true, "Pleaser add your name"],
    },
    surname: {
      type: String,
      //require: [true, "Pleaser add surname"],
    },
    googleId: {
      type: Number,
      unique: [true, "Email id address already taken"],

    },

    email: {
      type: String,
     // require: [true, "Pleaser add email"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
    //  require: [true, "Pleaser add password"],
    },
    accStatus: {
      type: Boolean,
      default: true,
    },
    codeVerification:
    { type: String,
      default: null
    },
    codeExpiration: {
      type: Date,
      default: null
    },
    adresse: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
      fullAdresse: {
        type: Object,
      }     
    },
    phoneNumber: {
      type: Number,
  
    },
    role: {
        type: String,
        enum: roles,
        default: "farmer",
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
    verificationCode: {
      type: String,
      default:"0000"
 
    },
    availability :{ type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userschema);
export default User;
