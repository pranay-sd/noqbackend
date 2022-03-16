const {VendorItem} = require('../models/vendorModel')
const {VendorCategory} = require('../models/vendorModel')

const mongoose = require('mongoose')

const getAllItems = async (req,res) =>{
    try {
        const records = parseInt(req.query.recordsPerPage)
        let pages = req.query.pagesNum - 1
        const search = req.query.search 
        
        const item = await VendorItem.aggregate([
            {$match: {name: {$regex: search, $options: 'i'}}},
            {$limit:records},
            {$skip: pages*records}
        ])
        res.send(item)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const getItemById = async (req,res) =>{
    try {
        const item = await VendorItem.findById(req.params.id)
        res.send(item)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const getItemsByCategory = async (req,res) =>{
    try {
        const item = await VendorItem.find({"category":req.params.id})
        res.send(item)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const getItemsByVendor = async (req,res) =>{
    try {
        // {"vendor":req.params.id}
        const ObjectId = mongoose.Types.ObjectId
        const item = await VendorItem.aggregate([
            {$match: {"vendor":ObjectId(req.params.id)}},
            // {$unwind:"$category"},
            {$lookup:{
                    from: "vendorcategories",
                    localField: "category",
                    foreignField: "_id",
                    as: "Category"
                }},
            {$group:{
                "_id":"$category",
                // category:{$push:"$Category.categoryName"},
                items:{$push:"$$ROOT"},
                categoryDet:{"$addToSet":"$Category"}
            }},
            {$unwind:"$categoryDet"},
            {$addFields:{name:"$categoryDet.categoryName"}},
            {$project:{"items.category":0,"items.vendor":0,"categoryDet":0}},
        
    ])
        res.send(item)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const createItem = async (req,res) =>{
    try {
        const item = await VendorItem.create(req.body)
        res.send(item)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const updateItemById = async (req,res) =>{
    try {
        item = await VendorItem.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.send(item)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const deleteItemById = async (req,res) =>{
    try {
        await VendorItem.findByIdAndDelete(req.params.id)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}


module.exports = {getAllItems, getItemById, getItemsByCategory, getItemsByVendor, createItem, updateItemById, deleteItemById}