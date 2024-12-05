const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    foodTags: {
        type: Array,
        require: true
    },

    category:{
        type: String,
        require: true
    },

    code: {
        type: String,
        require: true,
    },

    isAvailable: {
        type: Boolean,
        require: true,
        default: true
    },

    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },

    rating: { 
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },

    ratingCount: {
        type: String
    },

    description: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        require: true
    },

    additives: {
        type: Array,
        require: true
    },

    imageUrl: {
        type: Array,
        require: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Food', FoodSchema) 