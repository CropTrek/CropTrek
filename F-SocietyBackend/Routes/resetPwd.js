import  express  from "express";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv' ;
const testRoutes = express.Router();
import User from "../Models/UserModel.js";
dotenv.config();
import  bcrypt from "bcryptjs" ;
import jwt from "jsonwebtoken" ;



const JWT_SECRET ="hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";






  testRoutes.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
       return res.status(404).json({ message:  "User Not Exists!!" });
      }
      const secret = JWT_SECRET + oldUser.password;
      const token = jwt.sign({ user_id: oldUser._id , email :oldUser.email  }, secret, {
        expiresIn: "20m",
      });
      const link = `http://localhost:3000/resetPwd/${oldUser._id}/${token}`;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "haweswebsite@gmail.com",
          pass: "lmsevtndtdqutlbw",
        },
      });
  
      var mailOptions = {
        from: "haweswebsite@gmail.com",
        to: email,
        subject:  'CropTrek - Reset Password',
        html: `
          <h3>Hello </h3>
          <p>To reset your password please follow this link: <a target="_" href="${link}">Reset Password Link</a></p>
          <p>Cheers,</p>
          <p>CropTrek</p>
        `
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ message: 'Password reset email sent successfully' });
        }
      });
     
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  testRoutes.get("/resetPwd/:id([0-9a-fA-F]{24})/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      res.status(404).json({ message: 'User not defined' });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
       res.status(200).json({ message: 'User verified' });
    } catch (error) {
      res.status(401).json({ message: 'Not verified' });
    }
  });



  testRoutes.post("/resetPwd/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
  });
  export default testRoutes;