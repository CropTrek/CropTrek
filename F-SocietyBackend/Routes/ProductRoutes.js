import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from './../Models/ProductModel.js';
import User from './../Models/UserModel.js';
import router from "./OrderRoutes.js";
import multer from "multer";
import path from "path";
import {fileURLToPath} from "url";
import {__dirname} from "../server.js";
import {sendNotification} from "../Controllers/NotificationController.js";


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

productRoute.get("/", asyncHandler(async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .populate("user") // populate the "user" field with user data
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ _id: -1 });

    res.status(201).json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
    });
}));




productRoute.get("/Products/NotFiltered", asyncHandler(async (req, res) => {
    const products = await Product.find().populate('user', 'name email adresse').sort({ date: -1 });
    res.status(201).json({ products });
}));


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



// Product Review
productRoute.post("/:id/:userId/Review",asyncHandler (
    async (req,res)=>{

        const {rating,comment}=req.body;
        const product=await Product.findById(req.params.id);
        const userId = req.params.userId;
       const  user=await User.findById(userId);
        if(product){



            const alreadyReviewed = product.reviews.find((r) => r.user && r.user.toString() === userId.toString());
            if (alreadyReviewed) {
                res.status(400);
                throw new Error("Product Already Reviewed");
            }
            const review={
                name:user.name,
                rating:Number(rating),
                comment,
                user:user._id,
            };
            product.reviews.push(review);
            product.numReviews=product.reviews.length;
            product.rating=product.reviews.reduce(  (acc,item)=>item.rating+acc,0 )/product.reviews.length;
            await   product.save();
            res.status(201).json(  review)


        }else{
            res.status(404);
            throw new Error("Product not found");

        }
        

    }
))

// get RVS Product
productRoute.get("/getReviews/:id/",asyncHandler (
    async (req,res)=>{


        const product=await Product.findById(req.params.id);

        if(product){




            res.status(201).json(  product.reviews)


        }else{
            res.status(404);
            throw new Error("Product not found");

        }


    }
))

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

productRoute.post('/:userId', upload.single('image'), asyncHandler(async (req, res) => {
    const { name, price, description, countInStock } = req.body;
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const product = new Product({
        name,
        price,
        description,
        image: req.file.filename,
        countInStock,
        user: user._id,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
    await sendNotification("New Product", ' Product: '+ name +' in our shop published by  '+user.name+ '.', user._id, null, "farmer");

}));
// Create a new product
// productRoute.post('/:userId', asyncHandler(async (req, res) => {
//     const { name, price, description, image, countInStock } = req.body;
//     const userId = req.params.userId;
//
//     const user = await User.findById(userId);
//     if (!user) {
//         res.status(404);
//         throw new Error('User not found');
//     }
//
//     const product = new Product({
//         name,
//         price,
//         description,
//         image,
//         countInStock,
//         user: user._id,
//     });
//
//     const createdProduct = await product.save();
//     res.status(201).json(createdProduct);
// }));

// productRoute.post("/:id",asyncHandler( async (req, res) => {
//     const { name, price, description,image,countInStock } = req.body;
//     // if (req.body && req.body.name) {
//     //     const { name } = req.body;
//     //    console.log('====================================');
//     //    console.log(name);
//     //    console.log('====================================');
//     //   } else {
//     //     console.log('====================================');
//     //     console.log("nooooooooooooooooo");
//     //     console.log('====================================');
//     //   }
//     const id=req.params.id;
// const user=User.findById(id)
//     const productExist=await Product.findOne({name});
//
//     if(productExist){
//         res.status(400);
//         throw new Error("Product already exists");
//     }else{
//         const product=new Product({
//             name,
//             price,
//             description,
//             image,
//             countInStock,
//             user:user._id
//         });
//         if(product){
//
//             const createdProduct=await product.save();
//
//             res.status(201).json(createdProduct);
//
//         }
//         else{
//             res.status(400);
//             throw new Error("Product not created");
//         }
//
//     }
//
//   }));
// Edit Product
productRoute.put("/updateProduct/:id",asyncHandler( async (req, res) => {
    const { name, price, description,countInStock } = req.body;

    const id=req.params.id;
    const product=await Product.findById(id);

    if(product){
        product.name=name ||product.name;
        product.price=price || product.price;

        product.countInStock=countInStock || product.countInStock;
   product.description=description || product.description;
   const editProduct=await product.save();
   res.json(editProduct);


        }
        else{
            res.status(404);
            throw new Error("Product not found");
        }



}));

// Delete product

productRoute.delete("/:id",asyncHandler (
    async (req,res)=>{
        const product=await Product.findById(req.params.id);

        if(product){
            await product.remove()
            res.json({message:"product removed"});

        }else{
            res.status(404);
            throw new Error("Product not found");

        }


    }
))


productRoute.get('/productsByUser/:userId/products', async (req, res) => {
    try {
        const userId = req.params.userId;
        const products = await Product.find({user: userId}).sort({timestamps: -1});
        res.json(products);
    } catch (err) {
        console.error(`Erreur lors de la récupération des produits de l'utilisateur ${req.params.userId}: ${err}`);
        res.status(500).send('Erreur serveur');
    }
});


productRoute.get('/getImage/:productId/products', asyncHandler(async (req, res) => {

    console.log("**********************")
    console.log(__dirname)
    try {
        const product = await Product.findById(req.params.productId);
        console.log("**********************")
        if (product) {
            const extensions = ['png', 'jpg', 'jpeg', 'gif'];
            const fileName = product.image.split('.')[0];
            let fileFound = false;

            for (let i = 0; i < extensions.length; i++) {
                const extension = extensions[i];
                const filePath = path.join(__dirname, `/uploads/${product.image}`);
                console.log("**********************")

                console.log(__dirname);

                    res.sendFile(filePath);
                    fileFound = true;
                    break;

            }

            if (!fileFound) {
                res.status(404).send('Image not found');
            }
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}));


productRoute.get('/topProducts/top', asyncHandler(async (req, res) => {
    // Sort products by numReviews.rating in descending order
    const products = await Product.find().sort({ 'reviews.rating': -1 }).limit(7);

    // Return the top products as a JSON response
    res.json(products);
}));





productRoute.get('/users/:id/products', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({ _id: userId, role: 'supplier' });
        console.log(user)
        if (!user) {
            return res.status(404).send('Utilisateur introuvable ou n\'est pas un fournisseur');
        }
        const products = await Product.find({ user : user });
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
});


productRoute.get('/users/suppliers', async (req, res) => {

    try {
        const users = await User.find({  role: 'supplier' });
        console.log(users)
        if (!users) {
            return res.status(404).send('Utilisateurs introuvables ou n\'est pas un fournisseur');
        }

        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
});



// Product.collection.createIndex({ location: "2dsphere" });
// productRoute.get("/test/products/:userId", async (req, res) => {
//     try {

//     const userId = req.params.userId;

//     const user = await User.findById(userId);
//     const [x, y] = user.adresse.coordinates;

//     const products = await Product.aggregate([
//         {
//             $geoNear: {
//                 near: {
//                     type: "Point",
//                     coordinates: [x, y],
//                 },
//                 distanceField: "distance",
//                 spherical: true,
//                 maxDistance: 10000,
//             },
//         },
//         {
//             $lookup: {
//                 from: "users",
//                 localField: "user",
//                 foreignField: "_id",
//                 as: "user",
//             },
//         },
//         {
//             $unwind: "$user",
//         },
//         {
//             $project: {

//                 "user.name": 1,
//                 "user.adresse.fullAdresse": 1,
//             },
//         },
//     ]);

//     res.json(products)
//     }catch (err) {
//         console.log("88888888888888888")
//         console.error(err)
//     }
// });
// Route pour récupérer les produits recommandés pour un produit donné
export default productRoute;
