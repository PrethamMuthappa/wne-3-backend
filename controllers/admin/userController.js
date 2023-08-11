const asyncHandler = require('express-async-handler');
const UserSchema = require('../../models/user');
const IdValidate = require('../../utils/validation/idValidation');



/**
 * @description : List all user present in database
 * @access:private
 * @param {object} req:request for all users
 * @param {object} res:response for all users
 * @return {object} :response for all users {status,message,data}
 */

const getAllUser = asyncHandler(async(req,res)=>{
    try {
        // {userType:{$ne:'Admin'}}
        // { userType: { $ne: 'Admin' } }
        const [count, result] = await Promise.all([
            UserSchema.countDocuments(),
            UserSchema.find().select(['-refreshToken','-loginReactiveTime'])
        ]);
        res.json({
            count,
            data:result
        })
    } catch (error) {
        throw new Error(error)
    }
});

/**
 * @description : get single user by id
 * @access:private
 * @param {object} req:request for single user id
 * @param {object} res:response for single user
 * @return {object} :response for single user  {status,message,data}
 */
const getUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    IdValidate(id);
    const result = await UserSchema.findById(id);
    if(!result){
        throw new Error('Records not found')
    }
    res.json({
        data:result
    })
});

/**
 * @description : Delete user from database
 * @access:private
 * @param {object} req:request for user deletation
 * @param {object} res:response for user deletation
 * @return {object} :response for user deletation {status,message,data}
 */
const deleteUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    IdValidate(id);
    const result = await UserSchema.findByIdAndDelete(id);
    if(!result){
        throw new Error('Records not found')
    }
    res.json({
        message:'User deleted Successfully'
    })
});

/**
 * @description : update user 
 * @access:public
 * @param {object} req:request for update user
 * @param {object} res:response for update
 * @return {object} :response for update {status,message,data}
 */
const updateUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const data = req.body;
    IdValidate(id);
    try {
        const result = await UserSchema.findByIdAndUpdate(
            id,
            data,
            {new:true});
        res.json({
            data:result
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    getAllUser,
    getUser,
    deleteUser,
    updateUser
}