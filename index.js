const express = require('express')
const mongoose = require('mongoose')

const config = require('./config/appConfig')
const globalErrorHandler = require('./middlewares/appErrorHandler')
const routeLoggerMiddleware  = require('./middlewares/routeLogger')
const app = express()
const fs = require('fs')
const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

app.use(globalErrorHandler.errorHandler);

app.use(routeLoggerMiddleware.logIp)


// Bootstrap Models

const modelsPath = './models'
fs.readdirSync(modelsPath).forEach((file) => {
    console.log('inside')
    if (-file.indexOf('.js')) {
        require(modelsPath + '/' + file);

    }
})

// Bootstrap routes


const routersPath = './routes'

fs.readdirSync(routersPath).forEach((file) => {
    if (-file.indexOf('.js')) {
        console.log('opening this file');
        console.log(routersPath + '/' + file);
        let route = require(routersPath + '/' + file);
        route.setRouter(app)

    }
})

app.use(globalErrorHandler.notFoundHandler);




app.listen(config.port, () => {
    console.log('Example app listening on port ' + config.port);
    mongoose.connect(config.db.uri)
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('connected successfully ')
    });
})