const dotenv = require('dotenv')
dotenv.config()

const connectToDB = require('./config/db.js')
connectToDB(process.env.MONGO_URI)

const express = require('express')
const app = express()
app.use(express.json())

const fileUpload = require("express-fileupload");
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}));


app.use("/api/v1",require("./routes/uploadFile"));

app.use('/api/vendor', require('./routes/vendorRoutes'))
app.use('/api/category', require('./routes/categoryRoutes.js'))
app.use('/api/item', require('./routes/itemRoutes.js'))
app.use('/api/venue',require('./routes/venueRoutes.js'));
app.use('/api/event',require('./routes/eventRoutes.js'));

const port = process.env.SERVER_PORT
app.listen(port, () =>
    console.log(`port at ${ port }`)
)