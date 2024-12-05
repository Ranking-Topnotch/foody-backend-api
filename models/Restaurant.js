const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    time: {
        type: String,
        require: true,
        unique: true,
    },

    imageUrl:{
        type: String,
        require: true
    },

    foods: {
        type: Array,
        require: false,
    },

    pickup: {
        type: Boolean,
        require: false,
        default: true
    },

    delivery: {
        type: Boolean,
        require: false,
        default: true
    },

    owner: {
        type: String,
        require: true
    },

    isAvailable: {
        type: Boolean,
        default: true
    },

    code: { 
        type: String,
        require: true
    },

    logoUrl: { 
        type: String,
        require: true,
        default: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png'
    },

    rating: {
        type: Number,
        min: 1,
        max: 5
    },

    ratingCount: {
        type: String,     
    },

    coords: {
        id: { type: String, require: true},
        latitude: { type: Number, require: true},
        longitude: { type: Number, require: true},
        latitudeDelta: { type: Number, require: true, default: 0.0122},
        longitudeDelta: { type: Number, require: true, default: 0.0221},
        address: { type: String, require: true},
        title: { type: String, require: true}
    },

}, { timestamps: true})

module.exports = mongoose.model('Restaurant', RestaurantSchema) 