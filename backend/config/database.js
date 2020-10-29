const mongoose = require('mongoose')
const dbURL = require('./properties').DB

//export this function and imported by server.js
module.exports = () => {

    mongoose.connect(dbURL,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    )

    mongoose.connection.on('connected', () => {
        console.log("Mongoose default connection is open to ", dbURL)
    })

    mongoose.connection.on('error', (err) => {
        console.log("Mongoose default connection has occured "+err+" error")
    })

    mongoose.connection.on('disconnected', () => {
        console.log("Mongoose default connection is disconnected")
    })

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log("Mongoose default connection is disconnected due to application termination")
            process.exit(0)
        })
    })
}
