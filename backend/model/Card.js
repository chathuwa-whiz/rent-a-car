import mongoose from "mongoose";
import cryptoUtils from "../util/cryptoUtil.js";

const cardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cardNumber: {
        type: String,
        required: true,
        // set: function(cardNumber) {
        //     return cryptoUtils.encryptData(cardNumber);
        // },
        // get: function(cardNumber) {
        //     return cryptoUtils.decryptData(cardNumber);
        // }
    },
    cvv: {
        type: String,
        required: true,
        // set: function(cvv) {
        //     return cryptoUtils.encryptData(cvv);
        // },
        // get: function(cvv) {
        //     return cryptoUtils.decryptData(cvv);
        // }
    },
    expiryDate: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v),
            message: props => `${props.value} is not a valid expiry date format (MM/YY)!`
        }
    },
    cardholderName: {
        type: String,
        required: true
    },
    cardType: {
        type: String,
        enum: ['visa', 'mastercard', 'amex'],
        required: true
    }
}, {timestamps: true});


cardSchema.pre('save', function(next) {
    try {
        if (this.isModified('cardNumber')) {
            this.cardNumber = cryptoUtils.encryptData(this.cardNumber.toString());
        }
        
        if (this.isModified('cvv')) {
            this.cvv = cryptoUtils.encryptData(this.cvv.toString());
        }
        
        next();
    } catch (error) {
        next(error);
    }
});

cardSchema.set('toJSON', {
    transform: function(doc, ret) {
        try {
            const decrypted = cryptoUtils.decryptData(ret.cardNumber);
            ret.cardNumber = '••••' + decrypted.slice(-4);
            delete ret.cvv;
        } catch (error) {
            console.error('Error transforming card data:', error);
        }
        return ret;
    }
});

const Card = mongoose.model('Card', cardSchema);

export default Card;