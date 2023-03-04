import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from './../Models/ProductModel.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - description
 *         - price
 *         - countInStock
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         image:
 *           type: string
 *           description: The image of your Product
 *         name:
 *           type: string
 *           description: The name of your Product
 *         description:
 *           type: string
 *           description: The description
 *         price:
 *           type: number
 *           description: price
 *         countInStock:
 *           type: number
 *           description: countInStock
 *       example:
 *         id: d5fE_asz
 *         description: The New Turing Omnibus
 *         price: Alexander K. Dewdney
 *         image: rr
 *         name: Produit2
 *         countInStock: 10
 */
const productRoute=express.Router();
// Get all products

productRoute.get("/",asyncHandler (
    async (req,res)=>{
        const products=await Product.find({});
        res.json(products);

    }
))

// Get a single product

productRoute.get("/:id",asyncHandler (
    async (req,res)=>{
        const product=await Product.findById(req.params.id);
        
        if(product){
            res.json(product);

        }else{
            res.status(404);
            throw new Error("Product not found");

        }
        

    }
))

// Create a new product

productRoute.post("/",asyncHandler( async (req, res) => {
    const { name, price, description,image,countInStock } = req.body;
    // if (req.body && req.body.name) {
    //     const { name } = req.body;
    //    console.log('====================================');
    //    console.log(name);
    //    console.log('====================================');
    //   } else {
    //     console.log('====================================');
    //     console.log("nooooooooooooooooo");
    //     console.log('====================================');
    //   }

    const productExist=await Product.findOne({name});
  
    if(productExist){
        res.status(400);
        throw new Error("Product already exists");
    }else{
        const product=new Product({
            name,
            price,
            description,
            image,
            countInStock,
           // user:req.user._id
        });
        if(product){
            console.log('22222222222***************');
            const createdProduct=await product.save();
            console.log('11111111111111111***************');
            res.status(201).json(createdProduct);

        }
        else{
            res.status(400);
            throw new Error("Product not created");
        }
      
    }

  }));

export default productRoute;