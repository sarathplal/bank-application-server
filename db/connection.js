

// import mongoose
const mongoose = require('mongoose')

// get connection string from enviremnt variables : use process.env
const connectionString = process.env.DATABASE

// connect node with mongodb using mongoose
mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Mongo DB Atlas Connected successfully");
}).catch((error) => {
    console.log(`MongoDb connection error - ${error}`);
});
