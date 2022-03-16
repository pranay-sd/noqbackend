const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vendor = Schema({
    legalName:{type: String, required: true},
    displayName:{type: String, required: true},
    description:{type: String},
    address:{type: String, required: true},
    email:{
        type: String,
        required: true,
        unique: true
    },
    city:{type: String, required: true},
    country:{type: String, required: true},
    postCode:{type: String, required: true},
    contactNumber:{type: Number, required: true, unique: true}
})

const Vendor = mongoose.model('Vendor', vendor)

const vendorCategory = Schema({
    categoryName:{type:String, required:true},
    categoryDesc:{type:String},
    vendor:{type:Schema.Types.ObjectId, ref:'Vendor', required:true}
})

const VendorCategory = mongoose.model('VendorCategory', vendorCategory)

const vendorItem = Schema({
    name:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:Schema.Types.ObjectId, ref:'VendorCategory', required:true},
    vendor:{type:Schema.Types.ObjectId, ref:'Vendor', required:true},
    inStock:{type:Boolean, required:true},
    variants:[{
        vName:{type:String},
        vPrice:{type:Number},
    }],
    toppings: [{
        name:{
            type: String
        },
        price:{
            type: Number
        },
        inStock:{
            type: Boolean,
            default: true
        }
    }]
})

const VendorItem = mongoose.model('VendorItem', vendorItem)

module.exports = {Vendor,VendorCategory,VendorItem}