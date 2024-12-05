const router = require('express').Router()
const userController = require('../controllers/userController')
const { verifyAuthorization
    
 } = require('../middleware/verifyToken')

router.get('/', verifyAuthorization, userController.getUser)

router.delete('/', verifyAuthorization, userController.deleteUser)

router.put('/', verifyAuthorization, userController.updateUser)



module.exports = router;
