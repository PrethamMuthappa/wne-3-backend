import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId },
    orderItems: [{
        _id: false,
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
        quantity: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    isActive: { type: Boolean },
    isDeleted: { type: Boolean }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
}, { versionKey: false });

orderSchema.pre('save', async function (next) {
    this.isDeleted = false;
    this.isActive = true;
    next();
});

orderSchema.method('toJSON', function () {
    const {
        _id, __v, ...object
    } = this.toObject();

    object.id = _id;

    return object;
});

export default model('order', orderSchema);
