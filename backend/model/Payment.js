import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicleId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'cash', 'bank_transfer'],
        required: true
    },
    paymentRef: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now,
        required: false
    }
}, {timestamps: true});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;