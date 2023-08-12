import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import userSchema from '../../models/user.js';

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
        const decoded = jwt.verify(refreshToken, process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id);
        const { shippingAddress, name } = user;
        
        const productExists = await productSchema.findOne({ name: req.body.name });
        if (productExists) {
            return res.json({
                message: "Product already in cart",
                product: productExists
            });
        }

        const newProduct = new productSchema({
            ...req.body
        });

        user.cart.push(newProduct.id); 

        res.json({
            message: "Product added to cart",
            name,
            shippingAddress,
            product: newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
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
        const decoded = jwt.verify(refreshToken, process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id).populate('cart');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            data: user.cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
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
        const decoded = jwt.verify(refreshToken, process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const productIdToUpdate = req.body.productId; 
        const newQuantity = req.body.quantity;

        
        const productIndex = user.cart.findIndex(product => product.equals(productIdToUpdate));

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        
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
        const decoded = jwt.verify(refreshToken, process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const productIdToDelete = req.body.productId; 
   
        const productIndex = user.cart.findIndex(product => product.equals(productIdToDelete));

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        
        user.cart.splice(productIndex, 1);
        await user.save();

        res.json({
            message: "Product deleted from cart",
            deletedProductId: productIdToDelete
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});


export default {
    addProduct,
    getAllCartProducts,
    updateProductQuantity,
    deleteProduct
};
