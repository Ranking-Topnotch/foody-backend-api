const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const restaurantRouter = require('./routes/restaurant')
const categoriesRouter = require('./routes/categories')
const foodRouter = require('./routes/food')


dotenv.config()


// SETTING UP FIREBABE
const admin = require('firebase-admin')
const serviceAccount = require('./firebaseServiceAccountKey.jscon.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB is ready')).catch(err => console.log(err))


// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter)
app.use('/api/users', userRouter)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/category', categoriesRouter)
app.use('/api/foods', foodRouter)



app.listen(process.env.PORT, () => console.log(`App is listening @ ${process.env.PORT}`))