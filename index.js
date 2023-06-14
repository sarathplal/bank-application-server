// import steps

// import dotenv
// config : Loads contents in .env file into process.env 
require('dotenv').config()

// import express
const express = require('express')

// Import cors 
const cors = require('cors')

// import router
const router = require('./routes/router')
// import appMiddleware
const middleware = require('./Middleware/appMiddleware')

// creating express server
const server = express()


// import connection file
require('./db/connection')


// setup port number for server

const PORT = 3000 || process.env.PORT

// -use cors, json parser in server application
server.use(cors())
server.use(express.json())

// use appmiddleware
// server.use(middleware.appMiddleware)

    -// use router in server
    server.use(router)

// Resolving http request

server.get('/', (req, res) => {
    res.write("<h1 >Bank Server Started running!!</h1>")
})

//  run the server app in specified portnumber

server.listen(PORT, () => {
    console.log(`Server started running at ${PORT}`);
})