// application specific middleware

const appMiddleware = (req, res, next) => {

    console.log("Application specific middleware");

    // call next fn
    next()
}

module.exports = {
    appMiddleware
}