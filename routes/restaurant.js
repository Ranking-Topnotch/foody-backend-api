const router = require('express').Router()
const restaurantController = require('../controllers/restaurantController')
const { verifyAuthorization, verifyVendor, verifyToken } = require('../middleware/verifyToken')


router.get('/byId/:id', restaurantController.getRestaurant)

router.get('/:code', restaurantController.getRandomRestaurants)

router.delete('/:id', verifyVendor, restaurantController.deleteRestaurant)

router.patch('/:id', verifyVendor, restaurantController.serviceAvailabilty)



module.exports = router;
