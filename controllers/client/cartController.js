const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const userSchema = require('../../models/user');

/**
 * @description : Add new product to cart 
 * @access:public
 * @param {object} req:request for product data
 * @param {object} res:response for added product
 * @return {object} :response for register {status,message,data}
 */
const addProduct = asyncHandler(async(req,res)=>{
    try {
        const cookie = req.cookies;
        const refreshToken = cookie.refreshToken;
        const decoded = await jwt.decode(refreshToken,process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id);
        const {shippingAddress,name} = user;
        res.json({
            name,
            shippingAddress
        })
    } catch (error) {
        
    }
});

/**
 * @description : List of all products in cart 
 * @access:public
 * @param {object} req:request for cart products
 * @param {object} res:response for cart products
 * @return {object} :response for cart products {status,message,data}
 */
const getAllCartProducts = asyncHandler(async(req,res)=>{
    try {
        res.json({
            data:{
                product1:'iphone14',
                product2:'airpods'
            }
        })
    } catch (error) {
        throw new Error(error)
    }
})

/**
 * @description : cart product qunatity update 
 * @access:public
 * @param {object} req:request for quantity update
 * @param {object} res:response for quantity update
 * @return {object} :response for quantity update {status,message,data}
 */
const updateProductQuantity = asyncHandler(async(req,res)=>{
    try {
        res.json({
            message:'updated quantityy'
        })
    } catch (error) {
        throw new Error(error);
    }
})

/**
 * @description : Cart Delete 
 * @access:public
 * @param {object} req:request for delete product from cart
 * @param {object} res:response for delete
 * @return {object} :response for delete {status,message}
 */
const deleteProduct = asyncHandler(async(req,res)=>{
    res.json({
        message:'product deleted from cart'
    });
});


module.exports = {
    getAllCartProducts,
    updateProductQuantity,
    deleteProduct

}