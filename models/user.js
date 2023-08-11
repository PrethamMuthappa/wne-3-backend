import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    isActive: { type: Boolean },
    createdAt: { type: Date },
    updatedAt: { type: Date },

    shippingAddress: [{
        _id: false,
        pincode: { type: String },
        address1: { type: String },
        address2: { type: String },
        landmark: { type: String },
        city: { type: String },
        isDefault: { type: Boolean },
        state: { type: String },
        addressType: { type: String },
        fullName: { type: String },
        mobile: {
            type: Number,
            min: 10,
            max: 10
        },
        addressNo: { type: Number }
    }],

    wishList: [{
        _id: false,
        productId: { type: String }
    }],
    cart: [{
        _id: false,
        productId: { type: String }
    }],
    userType: {
        type: String,
        enum: ['User', 'Admin', 'Moderator'],
        default: 'User'
    },

    mobileNo: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    refreshToken: { type: String },
    resetPasswordLink: {
        code: String,
        expireTime: Date
    },

    loginRetryLimit: {
        type: Number,
        default: 0
    },
    loginReactiveTime: { type: Date }

}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

userSchema.pre('save', async function (next) {
    this.isActive = true;
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

userSchema.methods.isPasswordMatched = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.method('toJSON', function () {
    const {
        _id, __v, ...object
    } = this.toObject();
    object.id = _id;
    delete object.password;
    delete object.loginRetryLimit;

    return object;
}, { versionKey: false });

export default model('user', userSchema);
