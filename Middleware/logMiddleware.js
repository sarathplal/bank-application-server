// Router specific middleware
// import jwt
const jwt = require('jsonwebtoken')

const logMiddleware = (req, res, next) => {

    console.log("inside RouterSpecific middleware");
    // get token
    const token = req.headers['access-token']
    console.log(token);
    // verify token
    try {
        const { loginAcno } = jwt.verify(token, "getbalancekey12345");
        console.log(loginAcno);
        req.debitAcno = loginAcno;
        next()
    } catch {
        res.status(401).json("Please Log In")
    }
}
module.exports = { logMiddleware }

