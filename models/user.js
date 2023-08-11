const mongoose = require('mongoose');
const {USER_TYPES} = require('../constants/authConstants');
const bcrypt = require('bcrypt');
const AsyncHandler = require('express-async-handler');

const userScehma = new mongoose.Schema({
    username:{type:String},
    password:{type:String,required:true},
    email:{type:String,required:true},
    name:{type:String,requires:true},
    isActive:{type:Boolean},
    createdAt:{type:Date},
    updatedAt:{type:Date},

    shippingAddress:[{
        _id:false,
        pincode:{ type:String },
        address1:{ type:String },
        address2:{ type:String },
        landmark:{ type:String },
        city:{ type:String },
        isDefault:{ type:Boolean },
        state:{ type:String },
        addressType:{ type:String },
        fullName:{ type:String },
        mobile:{
          type:Number,
          min:10,
          max:10
        },
        addressNo:{ type:Number }
      }],

    wishList:[{
            _id:false,
            productId:{type:String}
        }],
    cart:[{
        _id:false,
        productId:{type:String}
    }],
    userType: {
            type: String,
            enum: ['User', 'Admin', 'Moderator'],
            default: 'User'
        },

    mobileNo:{
        type: String,
        required: true,
        minlength:10,
        maxlength: 10,
       },
    refreshToken:{type:String},
    resetPasswordLink:{
        code:String,
        expireTime:Date
      },

    loginRetryLimit :{
          type:Number,
          default:0   
      },
    loginReactiveTime:{type:Date}

},
{
    timestamps:{
        createdAt:'createdAt',
        updatedAt:'updatedAt'
    }
}
);


userScehma.pre('save',async function(next){
    this.isActive = true
    this.password = await bcrypt.hash(this.password,8);
    next();
});

userScehma.methods.isPasswordMatched = async function(password){
    return await bcrypt.compare(password,this.password);
}

userScehma.method('toJSON', function () {
    const {
      _id, __v, ...object 
    } = this.toObject();
    object.id = _id;
    delete object.password,
    delete object.loginRetryLimit
       
    return object;
  },{versionKey:false});



module.exports = mongoose.model('user',userScehma);