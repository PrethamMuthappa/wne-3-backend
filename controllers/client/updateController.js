const asyncHandler = require('express-async-handler');
const UserSchema = require('../../models/user');
const IdValidate = require('../../utils/validation/idValidation');


/**
 * @description : user update 
 * @access:public
 * @param {object} req:request for update
 * @param {object} res:response for update
 * @return {object} :response for register {status,message,data}
 */
const update = asyncHandler(async(req,res)=>{
    const user = req.user;
    const {id} = req.params;
    const data = req.body;
    IdValidate(id);
    try {
        if(id == user.id &&  data.hasOwnProperty('userType')==false){
            const result = await UserSchema.findByIdAndUpdate(
                id,
                data,
                {new:true});
            res.json({
                data:result
            })
        }
        else{
            res.json({
                message:'forbidden'
            })
        }
        
    } catch (error) {
        throw new Error(error)
    }
});


module.exports = {
    update
}
