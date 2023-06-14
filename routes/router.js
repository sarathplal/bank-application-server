// import express
const express = require('express')
// import logMiddleware
const logMiddleware=require('../Middleware/logMiddleware')

// create routes using express.Router() class
const router = new express.Router()

// import controller 
const userController = require('../controller/userController')

// define and export logic to resolve different http requests


// register request
router.post('/users/register', userController.register)

// login request
router.post('/users/login', userController.login)

// getbalance request
router.get('/user/balance/:acno',logMiddleware.logMiddleware, userController.balance)

//fundTransfer
router.post("/users/transfer",logMiddleware.logMiddleware,userController.fundTransfer)

// Mini statement
router.get("/user/ministatement",logMiddleware.logMiddleware,userController.miniStatement)

// Delete account
router.delete("/user/delete",logMiddleware.logMiddleware,userController.deleteMyAccount)

// export router
module.exports = router