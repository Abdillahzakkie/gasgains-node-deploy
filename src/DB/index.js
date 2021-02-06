const Mongoose = require('mongoose');
require('dotenv/config');

const connectDB = async () => {
    await Mongoose.connect(process.env.DB_CONNECTION, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true 
        }, async () => console.log("Connected")
    );
}
module.exports = connectDB;