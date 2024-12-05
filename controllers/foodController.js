const Food = require('../models/Food')

module.exports = {
    addFood: async ( req, res ) => {
        const newFood = new Food(req.body)  

        try{
            await newFood.save()

            return res.status(200).json({ status: true, message: "Food uploaded successfully"})
        }catch(err){
            return res.status(500).json({ status: true, message: err.message})
        }
    },

    getFoodById: async ( req, res ) => {
        const foodId = req.params.id 
        try{
            const food = await Food.findById(foodId)

            if(!food){
                return res.status(404).json({ status: false, message: "Food not found"})
            }

            return res.status(200).json(food)
        }catch(err){
            return res.status(500).json({ status: false, message: err.message})
        }
    },

    getFoodByRestaurant: async ( req, res ) => {
        const restaurantId = req.params.id

        try{
            const foods = await Food.find({ restaurant: restaurantId})

            if(!foods || foods.length === 0){
                return res.status(404).json({ status: false, message: "No food"})
            }

            return res.status(200).json(foods)
        }catch(err){
            return res.status(500).json({ status: false, message: err.message})
        }
    },

    deleteFoodById: async ( req, res ) => {
        const foodId = req.params.id
        
        try{
            const food = await Food.findById(foodId)

            if(!food){
                return res.status(404).json({ status: false, message: "Food item not found"})
            }

            await Food.findByIdAndDelete(foodId)
            return res.status(200).json({ status: true, message: "Food deleted successfully"})
        }catch(err){
            return res.status(500).json({ status: false, message: err.message})
        }
    },

    foodAvailability: async ( req, res ) => {
        const foodId = req.params.id

        try{
            const food = await Food.findById(foodId)

            if(!food){
                return res.status(404).json({ status: false, message: "Food item not found"})
            }

            food.isAvailable = !food.isAvailable

            await food.save()

            return res.status(200).json({ status: true, message: "Food availablity successfully toggled"})
        }catch(err){
            return res.status(500).json({ status: false, message: err.message})
        }
    },

    updateFoodById: async ( req, res ) => {
        const foodId = req.params.id
        
        try{
            const updatedFood = await Food.findByIdAndUpdate(foodId, req.body, { new: true, runValidators: true} )
        
            if(!updatedFood){
                return res.status(404).json({ status: false, message: "Food item not updated"})
            }
            return res.status(200).json({ status: true, message: "Food updated successfully"})
        }catch(err){
            return res.status(500).json({ status: false, message: err.message})
        }
    },

    addFoodTag: async ( req, res ) => {
       const foodId = req.params.id
       const { tag } = req.body

       try{
            const food = await Food.findById(foodId)

            if(!food){
                return res.status(404).json({ status: false, message: "Food item not found"})
            }

            if(food.foodTags.includes(tag)){
                return res.status(404).json({ status: false, message: "Tag already exist"})
            }

            food.foodTags.push(tag)
            await food.save()
            return res.status(200).json({ status: true, message: "Food tag added successfully"})
       }catch(err){
            return res.status(500).json({ status: false, message: err.message })
       }
       
    },

    getRandomFoodByCode: async ( req, res ) => {
        try{
            const randomFoodItem = await Food.aggregate([
                {$match: { code: req.params.code }},
                {$sample: { size: 5 }},
                {$project: { _id: 0 }}
            ])

            return res.status(200).json(randomFoodItem)
        }catch(err){
            return res.status(500).json({ status: false, message: err.message})
        }
    },

    addFoodType: async ( req, res ) => {
        const foodId = req.params.id
        const foodType  = req.body.foodType

        try{
            const food = await Food.findById(foodId)

            if(!food){
                return res.status(404).json({ status: true, message: err.message})
            }

            if(food.foodType.includes(foodType)){
                return res.status(400).json({ status: false, message: "Food type already exist"})
            }

            food.foodType.push(foodType)
            await food.save()
            return res.status(200).json({ status: true, message: "Food type added successfully"})
        }catch(err){
            return res.status(500).json({ status: false, message: err.message})
        }
    },

    getRandomByCategoryAndCode: async ( req, res ) => {
        const { category, code } = req.params

        try{
            let foods  = await Food.aggregate([
                {$match: { category: category, code: code }},
                {$sample: { size: 10 }}
            ])

            if(!foods || foods.length === 0){
                foods = await Food.aggregate([
                    {$match: { code: code }},
                    {$sample: { size: 10 }}
                ])
            }else{
                foods = await Food.aggregate([
                    {$match: { code: code }}
                ])
            }

            return res.status(200).json(foods)
        }catch(err){
            return res.status(500).json({ status: false, message: err.message})
        }
    }

}