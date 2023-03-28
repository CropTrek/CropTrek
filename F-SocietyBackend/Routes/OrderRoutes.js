// orderRoutes.js

import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
//import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Créer une nouvelle commande
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
 
  '/:id',

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
export default router;
