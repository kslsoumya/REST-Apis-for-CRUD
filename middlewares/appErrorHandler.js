

let errorHandler = (err, req, res, next)=> {
    console.log('Application Error handler occured')
    console.log(err)
    res.send('Some error occured at global level!')
  }

  let notFoundHandler = (req,res,next)=> {
      console.log('Global Not Found handler called')
      res.status(404).send('Route not found in the application')

  }

  module.exports ={
      errorHandler:errorHandler,
      notFoundHandler:notFoundHandler
  }

