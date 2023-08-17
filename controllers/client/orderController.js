import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import userSchema from '../../models/user.js';
import orderSchema from '../../models/order.js';
import IdValidate from '../../utils/validation/idValidation.js';

/**
 * @description : user new order  
 * @access: public
 * @param {object} req: request for new order
 * @param {object} res: response for new order
 * @return {object} : response for order {status, message, data}
 */
export const newOrder = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies;
        const refreshToken = cookie.refreshToken;
        const decoded = jwt.decode(refreshToken, process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id).populate('cart.productId');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

       
        const orderItems = [];

        
        let totalAmount = 0;

        
        for (const cartItem of user.cart) {
            const product = cartItem.productId;
            const quantity = cartItem.quantity;

            
            const totalPrice = product.price * quantity;

            orderItems.push({
                productId: product._id,
                quantity: quantity,
            });

            totalAmount += totalPrice;
        }

        
        const data = new orderSchema({
            customerId: user._id,
            orderItems: orderItems,
            totalAmount: totalAmount,
            ...req.body,
        });

        const result = await data.save();

        
        user.cart = [];
        await user.save();

        res.json({
            message: 'Order Placed Successfully',
            orderId: result._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

/**
 * @description : Get order details
 * @access: public
 * @param {object} req: request for order details
 * @param {object} res: response for order details
 * @return {object} : response for order details {status, message, data}
 */
export const orderDetails = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const { order_id } = req.query;
        IdValidate(order_id);
        const checkOrderId = await orderSchema.findById(order_id);
        if (checkOrderId.customerId != user.id) {
            res.json({
                message: 'Invalid order Id'
            });
        }
        const { _id, customerId, __v, ...responseData } = checkOrderId.toObject();
        const modifiedResponseData = { orderId: _id, ...responseData };
        res.json({
            data: modifiedResponseData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

/**
 * @description : user order cancellation 
 * @access: public
 * @param {object} req: request for cancellation
 * @param {object} res: response for cancellation
 * @return {object} : response for cancellation {status, message, data}
 */
export const cancelOrder = asyncHandler(async (req, res) => {
    try {
        res.json({
            message: 'Your order has been cancelled successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});


