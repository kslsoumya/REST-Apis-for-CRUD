

let errorHandler = (err, req, res, next) => {
    console.log('Application Error handler occured')
    console.log(err)
    let apiResponse = generateResponse.generate(true, 'Some error occured at global level!', 500, err)
    res.send(apiResponse)
}

let notFoundHandler = (req, res, next) => {
    console.log('Global Not Found handler called')
    let apiResponse = generateResponse.generate(true, 'Route not found in the application', 404, err)
    res.send(apiResponse)

}

module.exports = {
    errorHandler: errorHandler,
    notFoundHandler: notFoundHandler
}

