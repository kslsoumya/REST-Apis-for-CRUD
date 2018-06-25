
const logger = require('../libs/loggerLib')
const response = require('../libs/responseLib')
const check = require('../libs/checkLib')


let isAuthenticated =(req,res,next) =>{
    if(req.params.authToken || req.query.authToken || req.header('authToken')) {
        if(req.params.authToken === 'Admin'|| req.query.authToken === "Admin" || req.header('authToken') === "Admin" ) {
            req.user = {fullName :"Admin", userId : "Admin"}
            next()
        }
     else {
        logger.captureerror('Incorrect Authentication token','Authentication MiddleWare',5)
        let apiresponse = response.generate(true,'Incorrect Authentication token',403,null)
        res.send(apiresponse)
    } 
} else {
    logger.captureerror('Authentication token missing','Authentication MiddleWare',5)
        let apiresponse = response.generate(true,'Authentication token missing',403,null)
        res.send(apiresponse)

}

}

module.exports = {
    isAuthenticated : isAuthenticated
}