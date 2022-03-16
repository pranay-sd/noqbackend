const {VendorCategory} = require('../models/vendorModel')

const getAllCategories = async (req,res) =>{
    try {
        const records = parseInt(req.query.recordsPerPage)
        let pages = req.query.pagesNum - 1
        const search = req.query.search 
        
        const category = await VendorCategory.aggregate([
            {$match: {categoryName:{$regex: search,$options: 'i'}}},
            {$skip: pages*records},
            {$limit:records}
        ])
        res.send(category)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const getCategoryById = async (req,res) =>{
    try {
        const category = await VendorCategory.findById(req.params.id)
        res.send(category)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const createCategory = async (req,res) =>{
    try {
        const category = await VendorCategory.create(req.body)
        res.send(category)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const updateCategoryById = async (req,res) =>{
    try {
        const category = await VendorCategory.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.send(category)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const deleteCategoryById = async (req,res) =>{
    try {
        await VendorCategory.findByIdAndDelete(req.params.id)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}


module.exports = {getAllCategories, getCategoryById, createCategory, updateCategoryById, deleteCategoryById}