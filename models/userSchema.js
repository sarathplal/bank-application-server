// import mongoose

const mongoose = require('mongoose')

// create schema ()
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    acno: {
        type: Number,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
    },
    transaction: {
        type: Array,
        required: true,
    }
})

// -create model/collection to store documents  as per schema
// => (name inside, mongoose.model(name,schema) mustbe same as the name of the collection)
const users = mongoose.model("users", userSchema)

// export model

module.exports = users