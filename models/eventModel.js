const mongoose = require('mongoose');
const {Vendor} = require('./vendorModel.js');

const eventSchema = mongoose.Schema({ 
    name: {type: String, required: true}, 
    //location: {type: String, required: true}, 
    postCode: {type: String, required: true}, 
    startDate: {type: Date, required: true}, 
    endDate: {type: Date, required: true}, 
    address: { 
        type: String, 
        required: true, 
    }, 
    city: { 
        type: String, 
        default: '', 
    }, 
    country: { 
        type: String, 
        required: true, 
        //enum: COUNTRIES.map(country => country.name) 
    }, 
    isActive: { 
        type: Boolean, 
        required: true, 
        default: true 
    } ,
    zoneIdentifier: {type: String, required: true}, 
    zoneName: [{
        subZoneName: {type: String}
    }],vendors: [
        { 
            type:mongoose.Schema.Types.ObjectId,              
            ref: Vendor,
        }
    ]
}); 

const Event = mongoose.model('Event',eventSchema);    

const eventLocationSchema = mongoose.Schema({ 
    zoneIdentifier: {type: String, required: true}, 
    zoneName: [{
        subZoneName: {type: String}
    }],
    event: { 
        type:mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Event', 
        index: true
    }
}); 

const EventLocation = mongoose.model('EventLocation', eventLocationSchema); 
    
const eventVendorSchema = mongoose.Schema({ 
    vendors: [
        { 
            type:mongoose.Schema.Types.ObjectId, 
            required: true, 
            ref: Vendor,
        }
    ], 
    event: { 
        type:mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Event', 
        index: true 
    } 
}); 

const EventVendor = mongoose.model('EventVendor', eventVendorSchema);

module.exports = {Event,EventLocation,EventVendor};