import express from "express";
import dotenv from "dotenv";
import connectDataBase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import unblockRouter from "./Routes/validateRequest.js";
import { errorHandler, notFound } from "./Middleware/Error.js";
import appRouter from "./Routes/appRouter.js";
import bodyParser from "body-parser";
import resetRoutes from "./Routes/resetPwd.js";
import passport from "passport";
import { passports, passportConfig } from "./Security/passport.js";
import { Test } from "./Controllers/UserController.js";
import path from 'path';
import pyRouteTest from "./Routes/pythonRoutes/testPYRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc"; 
import session from "express-session";
import mongoose from "mongoose";
import swaggerJsdoc from "swagger-jsdoc";
import yaml from "js-yaml";
import {sendNotification} from './Controllers/NotificationController.js'

import Message from "./Models/Message.js";
/*************************** User */
import userRouter from "./Routes/UserRouter.js";
import userRouter2 from "./Routes/deleteUser.js";
import orderRouter from "./Routes/OrderRoutes.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// Swagger configuration
import stripe from "stripe";
import { fileURLToPath } from "url";
import productRoute2 from "./Routes/SysRecommRoutes.js";


const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

dotenv.config();
connectDataBase();
const app = express();
app.use(express.json());


/***********************************************************************************************PYTHON*/

import {spawn} from 'child_process'
import User from "./Models/UserModel.js";
import Job from "./Models/JobModel.js";

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});   

app.get('/recommendations', async (req, res) => {
  try {   
    const jobseeker_users = await User.find({ role: "jobSeeker" }, { _id: 1, searchHistory: 1, adresse: 1 });
    const job_data = await Job.find({})
  .populate('author', 'name surname email')
  .select('_id title description location file salary');
        
    const pythonScriptPath = path.join(__dirname, 'RecommendationJobOffers.py');
  
    const pythonProcess = spawn('python', [pythonScriptPath, JSON.stringify(jobseeker_users), JSON.stringify(job_data)]);
         
    let stdoutData = '';
    pythonProcess.stdout.on('data', (data) => { 
      stdoutData += data.toString();
      //console.log(`stdout: ${data}`);
    });      
  
    pythonProcess.stderr.on('data', (data) => {          
      console.error(`stderr: ${data}`);            
    });   

    pythonProcess.on('close', (code) => { 
      //console.log(`child process exited with code ${code}`);
      if (code === 0) {
        const recommendations = JSON.parse(stdoutData);
        res.json({ recommendations });
      } else {
        res.status(500).send('An error occurred while running the Python script');
      }
    });
  } catch (error) {  
    console.error(error);
    res.status(500).send('An error occurred while retrieving data from the database');
  } 
});      
/***********************************************************************************************PYTHON*/


/*********************************************SOCKET IO*/
const app2 = express();
const server = http.createServer(app2);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app2.use(cors);

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("sendMsg", async (message) => {
    try {
      const newMessage = new Message({
        from: message.from,
        to: message.to,
        text: message.text,
        read: false,
      });

      await newMessage.save();
      if(message.detected){
      await sendNotification("Bad word", 'userID :'+message.from+' sent a bad word', message.from, null, "admin");
      }
        await Message.updateMany(
          { to: message.from, from: message.to },
          { read: true }
        );
 
      const activeUserId = message.from; // Assuming the 'from' field is the active user's ID
      const messages = await Message.find({
        $or: [{ to: activeUserId }, { from: activeUserId }],
      })
        .populate("to", "_id")
        .populate({
          path: "from",
          select: "_id",
          model: "User",
        })
        .sort({ createdAt: 1 });

      const formattedMessages = messages.map((message) => {
        let from = message.from?._id || "unknown";
        let to = message.to?.id;
        let createdAt = message?.createdAt;
        return {
          from: from,
          to: to,
          text: message.text,
          read: message.read,
          createdAt:createdAt,

        };
      });

      io.emit("receiveMsg", formattedMessages);



      const conversations = await Message.aggregate([
        {
          $match: {
            $or: [
              { $and: [{ from: mongoose.Types.ObjectId(message.from) }, { to: mongoose.Types.ObjectId(message.to) }] },
              { $and: [{ from: mongoose.Types.ObjectId(message.to) }, { to: mongoose.Types.ObjectId(message.from) }] }
            ]
          }
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$from", mongoose.Types.ObjectId(message.from)] },
                { $toObjectId: "$to" },
                { $toObjectId: "$from" },
              ],
            },
            from: { $first: "$from" },
            to: { $first: "$to" },
            text: { $first: "$text" },
            createdAt: { $first: "$createdAt" },
            read: { $first: "$read" },

          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            "user.name": 1,
            "user.surname": 1,
            "user.profilePhoto": 1,
            from: 1,
            to: 1,
            text: 1,
            createdAt: 1,
            read:1,
            _id: {
              $cond: [
                { $eq: ["$from", mongoose.Types.ObjectId(message.from)] },
                { $toObjectId: "$to" },
                { $toObjectId: "$from" },
              ],
            },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);
      
      io.emit("userMsg", conversations);


  
    
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });
  
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(5002, () => console.log("Socket Io Server Running On 5002"));
/*********************************************SOCKET IO*/

// API
app.use(cors());
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "My API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

/******APP_ROUTER FILE DEFINE ALL THE APP ROUTES*******/
app.use(appRouter);
// taswira bech ya9raha m dossier uploads

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/********BODY PARSER MIDELWARES*************/

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/********PASSPORT TO MAKE OUR ROUTES SECURE*************/
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);
passports(passport);

app.post("/profile", passport.authenticate("jwt", { session: false }), Test);
app.use(express.static('./'));


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect:'http://localhost:3000/Register' }),
(req,res)=>{
  res.redirect('http://localhost:3000/Profile')
});


const specs = swaggerJsdoc(options);
const swaggerDocs = swaggerJSDoc(options);
console.log("********************");
console.log(swaggerDocs);
console.log("********************");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/orders", orderRouter);
app.use("/api/sys", productRoute2);
// ERROR HANDLER:erreur mnadhma jawha behy yjibha

dotenv.config();
connectDataBase();
//const app= express()

// API
app.use("/unblock", unblockRouter);
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.get("/api/config/stripe", (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLIC_KEY });
});
/*************************** User */

app.use('/farms', farmsRoutes);
app.use('/reset', resetRoutes);
app.use("/api/users",userRouter);
app.use("/api/users2",userRouter2);
app.use('/Bonjour',pyRouteTest)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
