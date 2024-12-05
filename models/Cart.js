const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    },

    additives:{
        type: []
    },

    instructions: {
        type: String,
        default: '',
    },

    quantity: {
        type: Number,
        default: 1
    },

    totalPrice: {
        type: Number,
        require: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Cart', CartSchema) 