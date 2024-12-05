const User = require('../models/User')
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const admin = require('firebase-admin')

module.exports = {
    createUser: async(req, res) => {
        const user = req.body

        try{
            await admin.auth().getUserByEmail(user.email)

            return res.status(400).json({ message: "User already exsist"})

        }catch(err){
            if(err.code === 'auth/user-not-found'){
                try{
                    const userResponse = await admin.auth().createUser({
                        email: user.email,
                        password: user.password,
                        emailVerified: false,
                        disabled: false
                    })
    
                    const newUser = new User({
                        username: user.username,
                        email: user.email,
                        password: CryptoJs.AES.encrypt(user.password, process.env.SECRET).toString(),
                        uid: userResponse.uid,
                        userType: 'Client'
                    })
    
                    await newUser.save()

                    return res.status(201).json({ message: 'SignUp successfull', status: true})
                }catch(err){
                    return res.status(500).json({ message: 'Error creating user', status: false, errMsg: err})
                }
            }
        }
    },

    loginUser: async(req, res) => {
        try{
            const user = await User.findOne({ email: req.body.email}, {__v: 0, updatedAt: 0, createdAt: 0 })
            if(!user){
                return res.status(401).json('Wrong credentials')
            }
            
            const decrptedPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET)
            const decrypted = decrptedPassword.toString(CryptoJs.enc.Utf8)
            
            if(decrypted !== req.body.password){
                return res.status(401).json('Wrong password')
            }
            const userToken = jwt.sign({
                id: user._id, userType: user.userType, email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '5d'})
            
            const { password, email, ...others } = user._doc

            return res.status(200).json({ ...others, userToken })
        }catch(err){
            return res.status(500).json({ message: 'Error while signing in', status: false, errMsg: err})
        }
    }
}