const UserSchema = require('../models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers && 
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(" ")[1];
      try {
          if(token){
            const decoded = jwt.verify(token,process.env.JWT_CLIENT_SECRET);
            const user = await UserSchema.findById(decoded?.id);
            req.user = user;
            next();
          }
      } catch (error) {
        throw new Error('UnAuthorized')
      }
    }else{
        throw new Error('Access Token missing')
    }
});

const isAdmin = asyncHandler(async(req,res,next)=>{
  const {email} = req.user;
  const adminUser = await UserSchema.findOne({email});
  if(adminUser.userType !== 'Admin'){
    throw new Error("forbidden")
  }
  next();
})

module.exports = {authMiddleware,isAdmin};