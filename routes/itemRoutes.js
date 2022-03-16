const router = require('express').Router()

const {getAllItems, getItemById, getItemsByCategory, getItemsByVendor, createItem, updateItemById, deleteItemById} = require('../controllers/item')
router.route('/').get(getAllItems).post(createItem)
router.route('/:id').get(getItemById).put(updateItemById).delete(deleteItemById)
router.route('/category/:id').get(getItemsByCategory)
router.route('/vendor/:id').get(getItemsByVendor)
module.exports = router