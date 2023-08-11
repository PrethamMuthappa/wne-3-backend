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
        const decoded = jwt.decode(refreshToken, process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id);
        const { shippingAddress, name } = user;

        res.json({
            name,
            shippingAddress
        });
    } catch (error) {
        // Handle error
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
        res.json({
            data: {
                product1: 'iphone14',
                product2: 'airpods'
            }
        });
    } catch (error) {
        throw new Error(error);
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
        res.json({
            message: 'Updated quantity'
        });
    } catch (error) {
        throw new Error(error);
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
    res.json({
        message: 'Product deleted from cart'
    });
});

export default {
    addProduct,
    getAllCartProducts,
    updateProductQuantity,
    deleteProduct
};
