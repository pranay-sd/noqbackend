const {Venue} = require('../models/venueModel.js');

/**
 * ROUTE : cant be decided
 * SECURITY : PUBLIC
 */
 const addVendorIn = async(req,res) => {
    try {
        // venue or venue
        const venueId = req.params.venueId;
        const {vendorId} = req.body;
        // console.log(venueId,vendorId);
        const newVendor = await Venue.updateOne(
            {_id: venueId},
            {"$push":{vendors: vendorId}}
        );
        if(newVendor) res.json({
            newVendor,
            status: 200
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

/**
 * ROUTE : cant be decided
 * SECURITY : PUBLIC
 */
 const deleteVendorIn = async(req,res) => {
    try {
        // venue or venue
        const venueId = req.params.venueId;
        const {vendorId} = req.body;
        const deletedVendor = await Venue.updateOne(
            {venue: venueId},
            {"$pull":{vendors: vendorId}}
        );
        if(deletedVendor) res.json({
            deletedVendor,
            status: 200
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

const getVendorsByVenue = async(req,res)=>{
    try {
        const venueId = req.params.venueId;
        //const {vendorId} = req.body;
        const vendors = await Venue.find(
            {venue: venueId}
        );
        if(vendors) return res.json({
            vendors,
            satus:200
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

module.exports = {addVendorIn,deleteVendorIn,getVendorsByVenue};