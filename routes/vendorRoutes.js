const router = require('express').Router()

const {getAllVendors, getVendorById, createVendor,updateVendor, deleteVendor} = require('../controllers/vendor')

router.route('/').get(getAllVendors).post(createVendor)
router.route('/:id').get(getVendorById).delete(deleteVendor).put(updateVendor)

module.exports = router