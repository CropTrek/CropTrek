import  express  from "express";
import dotenv from "dotenv";
import connectDataBase from './config/MongoDb.js';
import ImportData from './DataImport.js';
import productRoute from './Routes/ProductRoutes.js';
import unblockRouter from './Routes/validateRequest.js';
import farmsRoutes  from './Routes/farms.js'
import { errorHandler, notFound } from "./Middleware/Error.js";
import appRouter from './Routes/appRouter.js'
import bodyParser from 'body-parser'
import resetRoutes  from './Routes/resetPwd.js'
import passport from "passport";
import {passports,passportConfig} from './Security/passport.js'
import { Test } from "./Controllers/UserController.js";
import path from 'path';
import  asyncHandler  from 'express-async-handler'
// const swaggerUi = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import session from 'express-session'
//swaggerUi = require("swagger-ui-express");

import swaggerJsdoc from 'swagger-jsdoc';
import yaml from 'js-yaml';


/*************************** User */
import userRouter from "./Routes/UserRouter.js";
import userRouter2 from "./Routes/deleteUser.js";
import orderRouter from "./Routes/OrderRoutes.js"

const swaggerDocument = yaml.load('./docs/swagger.yaml');
import cors from 'cors';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import http from "http";
import { Server } from "socket.io";
// Use Swagger UI to serve the API documentation

// Swagger configuration
import stripe from 'stripe';
import ProductModel from "./Models/ProductModel.js";

import { fileURLToPath } from 'url';
import productRoute2 from "./Routes/SysRecommRoutes.js";
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

dotenv.config();
connectDataBase();
const app= express()
app.use(express.json());

/*********************************************SOCKET IO*/
const app2= express()
const server = http.createServer(app2);

const io = new Server(server, { 
  cors: {
    origin: "http://localhost:3000",          
    methods: ["GET", "POST"]
  }
});
app2.use(cors); 

io.on("connection", (socket) => {
	socket.emit("me", socket.id)  

	socket.on("disconnect", () => { 
		socket.broadcast.emit("callEnded")   
	}) 

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	}) 

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(5002, () => console.log("Socket Io Server Running On 5002"))
/*********************************************SOCKET IO*/


// API
app.use(cors());
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My API documentation'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server'
      }
    ]
  },
  apis: ['./Routes/*.js']
};



        /******APP_ROUTER FILE DEFINE ALL THE APP ROUTES*******/  
app.use(appRouter) 
// taswira bech ya9raha m dossier uploads 

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// console.log('====================================');
// console.log(__dirname);
// console.log('====================================');

//app.use(express.static(path.join(__dirname, '/uploads')));
//app.use(express.static(path.join(__dirname, 'uploads')));
// app.get('/file', (req, res) => {
//   const filePath = path.resolve('./uploads/640b8be3c42a9d91fb23db92.png');
//   res.sendFile(filePath);
// });
        /********BODY PARSER MIDELWARES*************/

app.use(session({
  secret:'keyboard cat',
  resave : false , 
  saveUninitialized : false , 

}))

        app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

        /********PASSPORT TO MAKE OUR ROUTES SECURE*************/
app.use(passport.initialize());
app.use(passport.session())
passportConfig(passport);
passports(passport); 

app.post('/profile', passport.authenticate('jwt', { session: false }),Test);
 
app.use(express.static('./'));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect:'http://localhost:3000/Register' }),
(req,res)=>{
  res.redirect('http://localhost:3000/Profile')
});

// app.put(
//   '/:id/pay',
//   asyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
  
//     const amount = order.totalPrice;
//     const amountInCents = Math.round(amount * 100);
//     if (amount <= 0) {
//       res.status(400);
//       throw new Error('Invalid amount');
//     }
//     if (order) {
//       const paymentIntent = await stripeInstance.paymentIntents.create({
//         amount: amountInCents,
//         currency: 'usd',
//         metadata: {
//           integration_check: 'accept_a_payment',
//           order_id: order._id.toString()
//         }
//       });

//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: paymentIntent.id,
//         status: paymentIntent.status,
//         update_time: paymentIntent.created,
//         email_address: req.body.email_address
//       };

//       const updatedOrder = await order.save();
//       res.json(updatedOrder);
//     } else {
//       res.status(404);
//       throw new Error('Order not found');
//     }
//   })
// );


const specs = swaggerJsdoc(options);
const swaggerDocs=swaggerJSDoc(options)
console.log("********************")
console.log(swaggerDocs);
console.log("********************")
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/orders",orderRouter)
app.use("/api/sys",productRoute2)
// ERROR HANDLER:erreur mnadhma jawha behy yjibha 

dotenv.config();
connectDataBase();
//const app= express()

// API
app.use('/unblock',unblockRouter);
app.use("/api/import",ImportData);
app.use("/api/products",productRoute);
app.get("/api/config/paypal",(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.get('/api/config/stripe', (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLIC_KEY });
});
/*************************** User */
app.use('/reset', resetRoutes);
app.use("/api/users",userRouter);
app.use("/api/users2",userRouter2);








// ERROR HANDLER

app.use('/farms', farmsRoutes);

app.use(notFound)
app.use(errorHandler);



const PORT = process.env.PORT || 1000 ;

app.listen(PORT,console.log(`Server is running on port ${PORT}`))





// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
// // load products from server 
// app.get("/api/products",(req,res)=>{
//     res.json(products)
// })
// // load single product from server 

// app.get("/api/products/:id",(req,res)=>{
//     const product =products.find((product)=>product._id===req.params.id)
//     res.json(product)

    
// })
