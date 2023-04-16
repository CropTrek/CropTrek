
import Product from "../Models/ProductModel.js";
import express from "express";
const productRoute2=express.Router();
import mongoose from "mongoose";

let Order;

try {
    Order = mongoose.model("Order");
} catch {
    Order = mongoose.model("Order", orderSchema);
}

productRoute2.get('/rec/:productId/recommendations', async (req, res) => {
    try {

        const productId = req.params.productId;

        const orders = await Order.find({ 'orderItems.product': productId });

        const products = {};

        orders.forEach((order) => {
            order.orderItems.forEach((item) => {
                if (item.product.toString() !== productId) {
                    if (item.product in products) {
                        products[item.product] += item.qty;
                    } else {
                        products[item.product] = item.qty;
                    }
                }
            });
        });

        const sortedProducts = Object.entries(products)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const recommendedProducts = await Promise.all(
            sortedProducts.map(async (product) => {
                const recommendedProduct = await Product.findById(product[0]);
                return recommendedProduct;
            })
        );

        res.status(200).json(recommendedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
});
export default productRoute2;
