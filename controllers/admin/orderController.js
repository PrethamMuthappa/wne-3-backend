import asyncHandler from 'express-async-handler';
import orderSchema from '../../models/order.js';
import IdValidate from '../../utils/validation/idValidation.js';
import jwt from 'jsonwebtoken';
import userSchema from '../../models/user.js';
/**
 * @description : List of all orders 
 * @access:private
 * @param {object} req:request for all orders list
 * @param {object} res:response for all orders list
 * @return {object} :response for all orders list {status,message,data}
 */
export const getAllOrders = asyncHandler(async (req, res) => {
    const page = 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const cookie = req.cookies;
    const refreshToken = cookie.refreshToken;
    const decoded = jwt.decode(refreshToken, process.env.SECRET_CLIENT);
    const user = await userSchema.findById(decoded.id);
    try {
    if (user.userType == 'Admin') {
        
            const [count, data] = await Promise.all([
                orderSchema.countDocuments(),
                orderSchema.find().skip(skip).limit(limit)
            ]);
    
           return res.json({
                count,
                data
            });
        } 
    res.json({
            message:'UnAuthorized'
           })
    }catch (error) {
        throw new Error(error);
    }
   
});

/**
 * @description : Update order status of user
 * @access:private
 * @param {object} req:request for order status update 
 * @param {object} res:response for order status updation
 * @return {object} :response for order status updation {status,message,data}
 */
export const updateStatus = asyncHandler(async (req, res) => {
    try {
        const { order_id } = req.params;
        const data = req.body;
        IdValidate(order_id);
        if (data.orderStatus === "Cancelled") {
            const orderDetails = await orderSchema.findByIdAndUpdate(
                order_id,
                { ...data, isActive: false },
                { new: true }
            );

            if (!orderDetails) {
                res.status(404).json({
                    message: 'Order not found'
                });
            }

            res.json({
                data: orderDetails
            });
        } else {
            const orderDetails = await orderSchema.findByIdAndUpdate(
                order_id,
                data,
                { new: true }
            );
            res.json({
                data: orderDetails
            });
        }
    } catch (error) {
        throw new Error(error);
    }
});

