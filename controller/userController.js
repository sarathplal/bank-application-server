// import model in controller.js

const users = require("../models/userSchema")

// import jsonwebtoken
const jwt = require('jsonwebtoken')

// define and export logics

// register

exports.register = async (req, res) => {

    // register logic
    console.log(req.body);
    // get  data sent by front_end
    const { username, acno, password } = req.body
    // check datas present in collection users
    if (!username || !acno || !password) {
        res.status(403).json("All inputs are required")
    }
    try {
        const preuser = await users.findOne({ acno })
        if (preuser) {
            res.status(406).json("User Already Exist !!!")
        } else {
            // add user to db
            const newuser = new users({
                username,
                password,
                acno,
                balance: 5000,
                transaction: []
            })
            // save new user to mongobd
            await newuser.save()
            res.status(200).json(newuser)
        }
        console.log(preuser);
        // response.json("In register")
    } catch (error) {
        res.status(401).json(error)
    }
    // res.send("Register request received , request loged")
}


// login
exports.login = async (req, res) => {
    // get req body

    const { acno, password } = req.body

    //    check acc nd pswd is in db
    try {

        // check acc nd pswdd is in db or not
        const preuser = await users.findOne({ acno, password })

        // check preuser or not
        if (preuser) {
            // generate token using jwt
            const token = jwt.sign({
                loginAcno: acno
            }, "getbalancekey12345")

            res.status(200).json({ preuser, token })
        } else {
            res.status(404).json("Invalid Account number / Password")
        }

    } catch (error) {
        res.status(401).json(error)
    }

}

// balance
exports.balance = async (req, res) => {

    // get acno from url parameter
    let acno = req.params.acno
    // get data of logged in user
    try {
        const preuser = await users.findOne({ acno })
        if (preuser) {
            res.status(200).json(preuser.balance)
        } else {
            res.status(401).json("Invalid Account Number")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// fund transfer
exports.fundTransfer = async (req, res) => {
    console.log("Inside transfer logic ");

    // 1. get body from request
    const { creditAcno, creditAmount, password } = req.body
    const { debitAcno } = req

    try {
        // 2. check debitacno and pswd present in mongodb
        const debitUserDetails = await users.findOne({ acno: debitAcno, password: password })

        // 3.Get credit user details
        const creditUserDetails = await users.findOne({ acno: creditAcno })

        // user details Before Transaction
        console.log("Before Transaction");
        console.log(creditUserDetails);
        console.log(debitUserDetails);

        if (debitAcno != creditAcno) {
            if (debitUserDetails && creditUserDetails) {

                // checkSufficient balance available for transfer
                if (debitUserDetails.balance >= creditAmount) {
                    //perform Transfer
                    // DEBIT STEPS
                    debitUserDetails.balance -= creditAmount


                    debitUserDetails.transaction.push({
                        transaction_Type: "DEBIT",
                        amount: creditAmount,
                        fromAcno: debitAcno,
                        toAcno: creditAcno
                    })

                    // Save debitUser details in mongoDB
                    await debitUserDetails.save()

                    // CREDIT STEPS
                    creditUserDetails.balance += creditAmount

                    creditUserDetails.transaction.push({
                        transaction_Type: "CREDIT",
                        amount: creditAmount,
                        fromAcno: debitAcno,
                        toAcno: creditAcno
                    })

                    //   save debitUser details in mongoDB
                    await creditUserDetails.save()

                    // user details after Transaction
                    console.log("After Transaction");
                    console.log(creditUserDetails);
                    console.log(debitUserDetails);

                    res.status(200).json("Transaction Successful")


                } else {
                    res.status(406).json("Insufficient Balance")
                }

            } else {
                res.status(406).json("Invalid credit/debit details ")
            }
        } else {
            res.status(406).json("Sorry, Self transfer is not possible")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// Mini statement
exports.miniStatement = async (req, res) => {
    // 1.get acno from request req.debitAcno
    let acno = req.debitAcno

    try {
        const preuser = await users.findOne({ acno })
        res.status(200).json(preuser.transaction)
    }
    catch (error) {
        res.status(401).json(error)
    }
}


// Delete My Account
exports.deleteMyAccount = async (req, res) => {
    // get account number
    let acno = req.debitAcno
    try {
        await users.deleteOne({ acno })
        res.status(200).json("User Removed Successfully")
    } catch (error) {
        res.status(401).json(error)
    }

}
