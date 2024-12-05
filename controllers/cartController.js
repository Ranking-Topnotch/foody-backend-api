const Cart = require('../models/Cart')

module.exports = {
    addProductToCart: async ( req, res ) => {
        const userId = req.user.id;
        const { productId, totalPrice, quantity } = req.body
        let count;

        try{
            const existingProduct = await Cart.findOne({ userId, productId})
            count = await Cart.countDocuments({userId})

            if(existingProduct){
                existingProduct.quantity += 1,
                existingProduct.totalPrice += totalPrice
                await existingProduct.save()
            }else{
                const newCount = new Cart({
                    userId: userId,
                    productId: req.body.productId,
                    additives: req.body.additives,
                    instructions: req.body.instructions,
                    totalPrice: req.body.totalPrice,
                    quantity: req.body.quantity
                })

                await newCart.save()
                count = await Cart.countDocument({userId})
            }

            return res.status(200).json({ status: true, count: count})
        }catch(err){
            return res.status(500).json({ status: false, message: err.message})
        }
    },

    removeProductFromCart: async ( req, res ) => {
        const itemId = req.params.id
        const userId = req.user.id
        
        try{
            const cartItem = await Cart.findById(itemId)

            if(!cartItem){
                return res.status(404).json({ status: false, message: 'Cart item not found' })
            }

            await Cart.findByIdAndDelete({ _id: itemId })
            count = await Cart.countDocument({userId})
            return res.status(200).json({ status: true, cartCount: count})
        }catch(err){
            return res.status(500).json({ status: false, message: err.message })
        }
    },

    fetchUserCart: async ( req, res ) => {
        const userId = req.user.id

        try{
            const userCart = await Cart.find({ userId: userId})
            .populate({
                path: 'productId',
                select: 'title imageUrl restaurant rating ratingCount'
            })

            return res.status(200).json({ status: true, cart: userCart})
        }catch(err){
            return res.status(500).json({ status: false, message: err.message })
        }
    },

    clearUserCart: async ( req, res ) => {
        const userId = req.user.id
        let count

        try{
            await Cart.deleteMany({ userId: userId})
            count = await Cart.countDocuments({ userId})

            return res.status(200).json({ status: true, count: count, message: 'Cart cleard successfuully'})
        }catch(err){
            return res.status(500).json({ status: false, message: err.message })
        }
    },

    getCartCount: async ( req, res ) => {},

    decrementProductToCart: async ( req, res ) => {}

}