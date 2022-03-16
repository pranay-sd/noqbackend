const {Event} = require('../models/eventModel');

const getAll = async(req,res) => {
    try {
        let pages = req.query.page
        pages = pages-1
        const records = parseInt(req.query.recordsPerPage)
        // const key = req.query.key
        const pass = req.query.pass.toString();
        // const order = req.query.order
        const events = await Event.aggregate([
            {$match: {name :{$regex: pass, $options: "i"}}},
            {$skip: pages*records},
            {$limit: records},

        ])
        res.json([events,{"count":events.length}])
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

const getEvent = async(req,res) => {
    try {
        const eventId = req.params.id;
        const events = await Event.findById(eventId); 
        res.json(events)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

/**
 * ROUTE : /api/vendor/id
 * SECURITY : PRIVATE
 */
const addEvent = async(req,res) => {
    try {
        const events = await Event.create(req.body)
        res.json(events)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};


const updateEvent = async(req,res) => {
    try {
        const events = await Event.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        // const event = await req.body
        res.json(events)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

const deleteEvent = async(req,res) => {
    try {
        const eventId = req.params.id;
        await Event.findByIdAndDelete(eventId);
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

// const {getLocation,deleteLocation,addLocation,getLocationsByEvent}
// = require('./Location.js');

// const {addVendorIn,deleteVendorIn} = require('./Operation.js');

module.exports = {getAll,getEvent,deleteEvent,updateEvent,addEvent,}
    // getLocation,deleteLocation,addLocation,getLocationsByEvent,
    // addVendorIn,deleteVendorIn};