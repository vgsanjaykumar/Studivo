const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database is connected!");
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = connectDB;