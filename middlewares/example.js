

let exampleMiddleWare = (req, res, next) => {
    req.user = { 'firstName': "mike", 'lastName': "tyson" }
    next()
}

module.exports = {
    exampleMiddleWare: exampleMiddleWare
}