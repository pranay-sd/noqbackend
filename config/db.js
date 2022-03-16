const mongoose = require('mongoose')

const connectToDB = async() => {
    try {
        // console.log(process.env)
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            serverSelectionTimeoutMS: 5000
       })
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1)
    }
}
 
module.exports = connectToDB