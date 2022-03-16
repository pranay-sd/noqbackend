const router = require('express').Router()

const {getAllCategories, getCategoryById, createCategory, updateCategoryById, deleteCategoryById} = require('../controllers/category')
router.route('/').get(getAllCategories).post(createCategory)
router.route('/:id').get(getCategoryById).put(updateCategoryById).delete(deleteCategoryById)

module.exports = router