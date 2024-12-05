const Restaurant = require('../models/Restaurant')

module.exports = {
    addRestaurant: async (req, res) => {
        const newRestaurant = new Restaurant(req.body)
        try{
            await newRestaurant.save()
            return res.status(201).json({ status: true, message: 'Resturant successfully creates'})
        }catch(err){
            return res.status(500).json({ message: 'Error creating restaurant', status: false, errMsg: err})
        }
    },

    serviceAvailabilty: async( req, res) => {
        const restaurantId = req.params.id;
        console.log(restaurantId)

        try{
            const restaurant = await Restaurant.findById(restaurantId)
            console.log(1)
            if(!restaurant){
                return res.status(403).json({ status: false, message: 'Restaurant does not exsit'})
            }
            console.log(1.1)
            restaurant.isAvailable = !restaurant.isAvailable
            console.log(1.2)

           await restaurant.save()
            console.log(1)

            return res.status(200).json({ status: true, message: `Availability set to ${isAvailable}`, isAvailable: restaurant.isAvailable})
        }catch(err){
            return res.status(500).json({ status: false, message: 'Error toggling restuarant Availabilty', err: err})
        }
    },

    deleteRestaurant: async (req, res) => {
        const restaurantId = req.params;
        
        try{
            const restaurant = await Restaurant.findById(restaurantId)

            if(!restaurant){
                return res.status(404).json({ status: false, message: 'Restaurant does not exsit'})
            }
            await Restaurant.findByIdAndDelete(restaurantId)
            await restaurant.save()

            return res.status(200).json({ status: true, message: `Restaurant successfully deleted`})
        }catch(err){
            return res.status(500).json({ status: false, message: 'Error deleting restuarant '})
        }
    },

    getRestaurant: async ( req, res ) => {
        const restaurantId  = req.params;
        
        try{
            const restaurant = await Restaurant.findById(restaurantId.id)

            if(!restaurant){
                return res.status(404).json({ status: false, message: 'Restaurant does not exsit'})
            }

            return res.status(200).json(restaurant)
        }catch(err){
            return res.status(500).json({ status: false, message: 'Error retrieving restuarant', err: err})
        }
    },

    getRandomRestaurants: async ( req, res ) => {
        
        try{
            let randomRestaurant = []

            if(req.params.code){
                randomRestaurant = await Restaurant.aggregate([
                    {$match: { code: req.params.code}},
                    {$sample: { size: 5}},
                    {$project: {__v: 0}}
                ])
            }

            if(!randomRestaurant.length){
                randomRestaurant = await Restaurant.aggregate([
                    {$sample: { size: 5}},
                    {$project: {__v: 0}}
                ])
            }

            if(randomRestaurant.length){
                return res.status(200).json(randomRestaurant)
            }

        }catch(err){
            return res.status(500).json({ status: false, message: 'Error finding restuarant '})
        }
    }
}