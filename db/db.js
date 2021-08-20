const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async (req, res, next) => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI, 
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, 
            console.log('db connected')
        )
    } catch (error) {
        console.log('Connection to DB failed')
    }
}

module.exports = connectDB