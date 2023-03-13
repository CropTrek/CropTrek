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
import passportConfig from './Security/passport.js'
import { Test } from "./Controllers/UserController.js";
import path from 'path';
// const swaggerUi = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

//swaggerUi = require("swagger-ui-express");

import swaggerJsdoc from 'swagger-jsdoc';
import yaml from 'js-yaml';


/*************************** User */
import userRouter from "./Routes/UserRouter.js";
import userRouter2 from "./Routes/deleteUser.js";

const swaggerDocument = yaml.load('./docs/swagger.yaml');
import cors from 'cors';

// Use Swagger UI to serve the API documentation


// Swagger configuration


dotenv.config();
connectDataBase();
const app= express()
app.use(express.json());
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
//app.use('/uploads', express.static(__dirname + '/uploads'));
const __dirname = path.dirname(new URL(import.meta.url).pathname);
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

        /********PASSPORT TO MAKE OUR ROUTES SECURE*************/
app.use(passport.initialize());
passportConfig(passport);

app.post('/profile', passport.authenticate('jwt', { session: false }),Test);




const specs = swaggerJsdoc(options);
const swaggerDocs=swaggerJSDoc(options)
console.log("********************")
console.log(swaggerDocs);
console.log("********************")
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//app.use("/api/orders",orderRoute)
// ERROR HANDLER:erreur mnadhma jawha behy yjibha 

dotenv.config();
connectDataBase();
//const app= express()

// API
app.use('/unblock',unblockRouter);
app.use("/api/import",ImportData);
app.use("/api/products",productRoute);


/*************************** User */
app.use('/reset', resetRoutes);
app.use("/api/users",userRouter);
app.use("/api/users2",userRouter2);








// ERROR HANDLER

app.use('/farms', farmsRoutes);

app.use(notFound)
app.use(errorHandler);



const PORT = process.env.PORT || 1000 ;

app.listen(PORT,console.log(`Mannou server is running on port ${PORT}`))





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