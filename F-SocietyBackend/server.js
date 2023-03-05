import  express  from "express";
import dotenv from "dotenv";
import connectDataBase from './config/MongoDb.js';
import ImportData from './DataImport.js';
import productRoute from './Routes/ProductRoutes.js';
import farmsRoutes  from './Routes/farms.js'
import { errorHandler, notFound } from "./Middleware/Error.js";
import appRouter from './Routes/appRouter.js'
// const swaggerUi = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
//bodyParser = require("body-parser"),
//swaggerUi = require("swagger-ui-express");
//const express = require('express');
import swaggerJsdoc from 'swagger-jsdoc';
import yaml from 'js-yaml';


/*************************** User */
import userRouter from "./Routes/UserRouter.js";

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
  
  definition: {
    components: {},
    info: {
      title: "LogRocket Express API with Swagger",
   
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
   
    
    },
   
  },
  apis: ["./Routes/*.js"]
};



        /******APP_ROUTER FILE DEFINE ALL THE APP ROUTES*******/  
app.use(appRouter)   



const specs = swaggerJsdoc(options);

const swaggerDocs=swaggerJSDoc(options)
console.log("********************")
console.log(swaggerDocs);
console.log("********************")
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/import",ImportData);

app.use("/api/products",productRoute);
//app.use("/api/orders",orderRoute)
// ERROR HANDLER:erreur mnadhma jawha behy yjibha 

dotenv.config();
connectDataBase();
//const app= express()

// API

app.use("/api/import",ImportData);
app.use("/api/products",productRoute);


/*************************** User */
app.use("/api/users",userRouter);






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