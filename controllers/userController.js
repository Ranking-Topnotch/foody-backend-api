const User = require('../models/User')

module.exports = {
    getUser: async ( req, res) => {
        const userId = req.user.id
        try{
            const user = await User.findById({ _id: userId}, { password: 0, __v: 0, createdAt: 0, updateAt: 0})
            return res.status(200).json(user)
        }catch(err){
            return res.status(500).json({ message: 'error', error: err.message})
        }
    },

    deleteUser: async ( req, res) => {
        const userId = req.user.id
        try{
            const user = await User.findByIdAndDelete(userId)
            return res.status(200).json({ status: true, message: 'User deleted successfully'})
        }catch(err){
            return res.status(500).json({ message: 'error deleting user', error: err.message})
        }
    },

    updateUser: async ( req, res) => {
        const userId = req.user.id
        try{
            await User.findByIdAndUpdate( userId, { 
                $set: req.body
            }, { new: true })
            return res.status(200).json({ status: true, message: 'User Updated successfully'})
        }catch(err){
            return res.status(500).json({ message: 'error updating user', error: err.message})
        }
    }
}