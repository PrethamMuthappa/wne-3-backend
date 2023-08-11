const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const userSchema = require('../../models/user');
const orderSchema = require('../../models/order');
const IdValidate = require('../../utils/validation/idValidation');


/**
 * @description : user new order  
 * @access:public
 * @param {object} req:request for new order
 * @param {object} res:response for new order
 * @return {object} :response for order {status,message,data}
 */
const newOrder = asyncHandler(async(req,res)=>{
    try {
        const user = req.user;
        const data = new orderSchema({...req.body});
        const result = await data.save();
        res.json({
            message:'Order Placed Successfully',
            orderId:result.id
        })
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * @description : Get order details
 * @access:public
 * @param {object} req:request for order details
 * @param {object} res:response for order details
 * @return {object} :response for order details {status,message,data}
 */
const orderDetails = asyncHandler(async(req,res)=>{
    try {
        const user  = req.user;
        const {order_id} = req.query;
        IdValidate(order_id);
        const checkOrderId = await orderSchema.findById(order_id);
        if(checkOrderId.customerId != user.id){
            res.json({
                message:'Invalid order Id'
            })
        }
        const  {_id,customerId,__v,...responseData} = checkOrderId.toObject();
        const modifiedResponseData = { orderId: _id, ...responseData };
        res.json({
            data:modifiedResponseData
        })
       
    } catch (error) {
        throw new Error(error);
    }
})

/**
 * @description : user order cancellation 
 * @access:public
 * @param {object} req:request for cancellation
 * @param {object} res:response for cancellation
 * @return {object} :response for cancellation {status,message,data}
 */
const cancelOrder = asyncHandler(async(req,res)=>{
   try {
    res.json({
        message:'your order cancelled successfully'
    });
   } catch (error) {
    throw new Error(error);
   }
});


module.exports = {
    newOrder,
    cancelOrder,
    orderDetails
}