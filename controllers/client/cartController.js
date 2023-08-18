import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import userSchema from '../../models/user.js';
import productSchema from "../../models/product.js";
import { login } from './authController.js';
import mongoose from 'mongoose';
/**
 * @description : Add new product to cart 
 * @access: public
 * @param {object} req: request for product data
 * @param {object} res: response for added product
 * @return {object} : response for added product {status, message, data}
 */
export const addProduct = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies;
        const refreshToken = cookie.refreshToken;
        const decoded = jwt.decode(refreshToken, process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id);
        const productId = req.params;
        let isProductInCart = false;

        for (const cartItem of user.cart) {
            if (cartItem.productId.equals(new mongoose.Types.ObjectId(productId))) {
                isProductInCart =true;
                break;
            }
           }
        
        if (isProductInCart) {
            return res.json({
                message: "Product already in cart",
            });
        }
       
        user.cart.push({
            productId:productId.id,
        }); 
        await user.save();

        res.json({
            message: "Product added to cart",
        });
    } catch (error) {
        throw new Error(error)
    }
});

/**
 * @description : List of all products in cart 
 * @access: public
 * @param {object} req: request for cart products
 * @param {object} res: response for cart products
 * @return {object} : response for cart products {status, message, data}
 */



export const getAllCartProducts = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies;
        const refreshToken = cookie.refreshToken;
        const decoded = jwt.decode(refreshToken, process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id);

        const cartWithProductDetails = await Promise.all(
        user.cart.map(async cartItem => {
          const product = await productSchema.findById(cartItem.productId);
            return {
                productId:product.id,
                name: product.name,
                quantity:cartItem.quantity
                };}));

            res.json({
                count: cartWithProductDetails.length,
                data: cartWithProductDetails
                });

    } catch (error) {
        throw new Error(error)
    }
});







/**
 * @description : Cart product quantity update 
 * @access: public
 * @param {object} req: request for quantity update
 * @param {object} res: response for quantity update
 * @return {object} : response for quantity update {status, message, data}
 */




export const updateProductQuantity = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies;
        const refreshToken = cookie.refreshToken;
        const decoded = jwt.decode(refreshToken, process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

<<<<<<< HEAD
        const productIdToUpdate = req.params.id; 
        const newQuantity = req.body.quantity;

      
        const productIndex = user.cart.findIndex(function (product) {
                return product.productId.equals(new mongoose.Types.ObjectId(productIdToUpdate));
            });
        
=======
        const productIdToUpdate = req.body.productId; // Assuming you send the product's _id in the request body
        const newQuantity = req.body.quantity; // Assuming you send the new quantity in the request body

        // Find the index of the product in the cart array
        const productIndex = user.cart.findIndex(product => product.equals(productIdToUpdate));

>>>>>>> origin
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Update the quantity of the product
        user.cart[productIndex].quantity = newQuantity;
        await user.save();

        res.json({
            message: "Product quantity updated",
            updatedProduct: user.cart[productIndex]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});



<<<<<<< HEAD
=======



>>>>>>> origin
/**
 * @description : Cart Delete 
 * @access: public
 * @param {object} req: request for delete product from cart
 * @param {object} res: response for delete
 * @return {object} : response for delete {status, message}
 */




export const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies;
        const refreshToken = cookie.refreshToken;
        const decoded = jwt.decode(refreshToken, process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id);
        const productId = req.params;

<<<<<<< HEAD
        const isProductInCart = user.cart.some(cartItem => 
            cartItem.productId.equals(new mongoose.Types.ObjectId(productId.id))
        );
        
        if (isProductInCart) {
            await userSchema.findByIdAndUpdate(decoded.id, {
                $pull: { cart: { productId: new mongoose.Types.ObjectId(productId.id) } }
            }, { new: true });
        
            return res.json({
                message: 'Product deleted from cart'
            });
        } else {
            return res.json({
                message: "Product not present in cart",
            });
        }
        
=======
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const productIdToDelete = req.body.productId; // Assuming you send the product's _id in the request body

        // Find the index of the product in the cart array
        const productIndex = user.cart.findIndex(product => product.equals(productIdToDelete));

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Remove the product from the cart array
        user.cart.splice(productIndex, 1);
        await user.save();

        res.json({
            message: "Product deleted from cart",
            deletedProductId: productIdToDelete
        });
>>>>>>> origin
    } catch (error) {
       throw new Error(error);
    }
});


export default {
    addProduct,
    getAllCartProducts,
    updateProductQuantity,
    deleteProduct
};
