const {Vendor} = require('../models/vendorModel')

const getAllVendors = async(req, res) =>{
    try {
        const records = parseInt(req.query.recordsPerPage)
        let pages = req.query.pagesNum - 1
        const search = req.query.search 
        // ? req.query.search:Null
        const vendor = await Vendor.aggregate([
            {$match: {legalName:{$regex: search,$options: 'i'}}},
            {$limit:records},
            {$skip: pages*records}
        ])
        res.send(vendor)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }

}

const getVendorById = async(req, res) =>{
    try {
        const vendor = await Vendor.findById(req.params.id)
        res.send(vendor)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const createVendor = async(req, res) =>{
    try {
        const {legalName,displayName,city,email,description,address,country,postCode,contactNumber}=req.body
        
        if(!legalName || !displayName || !city
            || !email || !description || !address || 
            !country || !postCode || !contactNumber) return res.sendStatus(403)

        const vendorFound = await Vendor.findOne({email});
        if(vendorFound) return res.sendStatus(403);
        const vendor = await Vendor.create(req.body)
        res.send(vendor)

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const updateVendor = async(req, res) =>{
    try {
        const vendorId = req.params.id
        const vendorFound = await Vendor.findById({_id:vendorId});
        if(!vendorFound) return res.sendStatus(403);
        const vendor = await Vendor.findByIdAndUpdate(vendorId, {$set:req.body},{new:true})
        res.send(vendor)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const deleteVendor = async(req, res) =>{
    try {
        await Vendor.findByIdAndDelete(req.params.id)
        res.send(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}
module.exports = {getAllVendors, getVendorById, createVendor, updateVendor, deleteVendor}