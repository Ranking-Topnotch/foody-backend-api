const router = require('express').Router()
const categoriesController = require('../controllers/categoriesController')
const { verifyAuthorization, verifyAdmin } = require('../middleware/verifyToken')

router.put('/:id', verifyAdmin, categoriesController.updateCategories)

router.post('/', categoriesController.createCategories)

router.delete('/:id', verifyAdmin, categoriesController.deleteCategories)

router.post('/image/:id', verifyAdmin, categoriesController.patchCategoriesImage)

router.get('/', categoriesController.getAllCategories)

router.get('/random', categoriesController.getRandomCategories)


module.exports = router;
