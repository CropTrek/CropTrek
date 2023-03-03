import express from 'express';
import  asyncHandler  from 'express-async-handler';
const orderRouter = express.Router();
orderRouter.post(
    "/",
    asyncHandler(async (req, res, next) => {
    const {
        orderItems,
        shippingAddress,
        payementMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice

    }=req.body;
    
if(orderItems && orderItems.length===0){
    res.status(400);
    throw new Error("No order items");
return
}
else{
const order=new Order({

    orderItems,
    shippingAddress,
    payementMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice

}
) 
const createOrder=await order.save();
  request.status(201).json(createOrder);

}

}))

export default orderRouter;
  
