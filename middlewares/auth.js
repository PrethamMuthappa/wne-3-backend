import UserSchema from '../models/user.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import userSchema from '../models/user.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_CLIENT_SECRET);
                const user = await UserSchema.findById(decoded?.id);
                req.user = user;
                next();
            }
        } catch (error) {
            throw new Error('UnAuthorized');
        }
    } else {
        throw new Error('Access Token missing');
    }
});

const cookieChecker = asyncHandler(async(req,res,next)=>{
    const cookie = req.cookies;
    const refreshToken = cookie.refreshToken;
    if(cookie != ''){
        const decoded = jwt.decode(refreshToken, process.env.SECRET_CLIENT);
        const user = await userSchema.findById(decoded.id);
        req.user = user;
        next();
    }else{
        throw new Error('Access Token missing');
    }
    })

const isAdmin = asyncHandler(async (req, res, next) => {
    const { userType } = req.user;
    if (userType !== 'Admin') {
        throw new Error("forbidden");
    }
    next();
});

export { authMiddleware, isAdmin ,cookieChecker};
