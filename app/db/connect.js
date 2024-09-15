const mongoose = require('mongoose')

const connectDB = (url) => {
    try {
        return mongoose.connect(url)
    } catch(error) {
        console.log(error)
    }  
}

module.exports = connectDB