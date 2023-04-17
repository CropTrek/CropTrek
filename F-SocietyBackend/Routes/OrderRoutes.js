// orderRoutes.js

import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

const router = express.Router();
import stripe from 'stripe';
import Product from "../Models/ProductModel.js";
import productRoute from "./ProductRoutes.js";

const stripeInstance = stripe('sk_test_51Mrh47EUjH7lozT7i8Ndfk88jh7XJTme9p8txs4O5yBVbwjUXTTfAAd5GraAkMNipehUMQksIZtA0B361HaLz6ff00Xk7m3v8h');

router.get("/", asyncHandler(async (req, res) => {
    const orders = await Order.find().sort({'createdAt':-1})
        .populate('user')

    res.status(200).json(orders);
}));

router.post(
 
  '/',
 
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,

      user
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
   
        user,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  })
);

// get Order by id
router.get(
 
  '/getUser/:id',

  asyncHandler(async (req, res) => {

const order =await Order.findById(req.params.id).populate(
  "user",
  "name email"
)



    if (order) {
      res.json(order)
    } else {
     

      res.status(404);

      throw new Error('Order not found')
    }

    
  })
);

// order is paid

// router.put(
 
//   '/:id/pay',

//   asyncHandler(async (req, res) => {

// const order =await Order.findById(req.params.id);



//     if (order) {
//       order.isPaid =true;
//       order.paidAt=Date.now;
//       order.payementRsult={
//         id:req.body.id,
//         status:req.body.status,
//         update_time:req.body.update_time,
//         email_address:req.body.email_address,
//       };
// const updatedOrder = await order.save()
// res.json(updatedOrder);
//     }
//     else {}
     
   
     

//       res.status(404);

//       throw new Error('Order not found')
    

    
//   })
// );
// router.put(
//   '/:id/pay',
//   asyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now;
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.email_address,
//       };
//       const updatedOrder = await order.save();

//       res.json(updatedOrder);
//     } else {
//       res.status(404);
//       throw new Error('Order not found');
//     }
//   })
// );
router.post(
  '/create-payment-intent',
  asyncHandler(async (req, res) => {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.json({ client_secret: paymentIntent.client_secret });
  })
);


// get order by user
router.get('/getOrder/Byuser/:id',asyncHandler(async (req, res) => {

    const order = await Order.find({user: req.user.id}).sort({id:-1});
    res.json(order);

}));

router.put(
  '/:id/pay',
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
  
    const amount = order.totalPrice;
    const amountInCents = Math.round(amount * 100);
    if (amount <= 0) {
      res.status(400);
      throw new Error('Invalid amount');
    }
    if (order) {
      const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        metadata: {
          integration_check: 'accept_a_payment',
          order_id: order._id.toString()
        }
      });

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        update_time: paymentIntent.created,
        email_address: req.body.email_address
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  })
);



router.get('/ordersByUser/:userId/orders', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    console.error(`Erreur lors de la récupération des commandes de l'utilisateur ${req.params.userId}: ${err}`);
    res.status(500).send('Erreur serveur');
  }
});


router.delete("/:id",asyncHandler (
    async (req,res)=>{
        const order=await Order.findById(req.params.id);

        if(order){
            await order.remove()
            res.json({message:"order removed"});

        }else{
            res.status(404);
            throw new Error("order not found");

        }


    }
))



export default router;
