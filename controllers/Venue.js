const {Venue} = require('../models/venueModel.js');

const getAll = async(req,res) => { 
    try {let pages = req.query.page
        pages = pages-1
        const records = parseInt(req.query.recordsPerPage)
        // const key = req.query.key
        const pass = req.query.pass.toString();
        // const order = req.query.order
        const venues = await Venue.aggregate([
            {$match: {name :{$regex: pass, $options: "i"}}},
            {$skip: pages*records},
            {$limit: records},

        ])
        res.json([venues,{"count":venues.length}])

    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        });
    }
};

const getVenue = async(req,res) => {
    try {
        const venueId = req.params.id;
        const venue=await Venue.findById(venueId);
        //If venue not found
        if(!venue){             
            res.send(400)
            throw new Error('Venue not found')
        }
        res.status(200).json(venue);
        
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        })
    }
};

const deleteVenue = async(req,res) => {
    try {
        const venueId = req.params.id;
        await Venue.findByIdAndDelete(venueId)
        //If venue is not found
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        })
    }
};

const updateVenue = async(req,res) => {
    try {
        const venue=await Venue.findById(req.params.id)
        //If venue not found
        if(!venue){
            res.send(400)
            throw new Error('Venue not found')
        }
        const updatedVenue=await Venue.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        res.status(200).json(updatedVenue)
        
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        })
    }
};

const createVenue = async(req,res) => {
    try {
        const venue = await Venue.create(req.body);
       res.status(200).json(venue)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        })
    }
};

// const {addVendorIn,deleteVendorIn,getVendorsByVenue} = require('./VenueOperation.js');

module.exports = {getAll,getVenue,deleteVenue,updateVenue,createVenue,}
    // addVendorIn,getVendorsByVenue,deleteVendorIn};