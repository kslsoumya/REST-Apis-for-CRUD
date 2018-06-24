const express = require('express')

const blogController = require('../controllers/blogController')
const appConfig = require('../config/appConfig')
let exampleMiddleWare = require('./../middlewares/example')
let setRouter = (app) => {
    // app.get('/test/route/:param1/:param2', controller.testRoute);
    // app.get('/test/query',controller.testQuery);
    // app.post('/test/body',controller.testBody);
let baseUrl = appConfig.apiVersion+'/blogs';

app.get(baseUrl+'/all',blogController.getAllBlogs);

app.get(baseUrl+'/view/:blogId',exampleMiddleWare.exampleMiddleWare, blogController.viewBlogById);

app.get(baseUrl+'/view/byAuthor/:author',blogController.viewBlogByAuthor);

app.get(baseUrl+'/view/byCategory/:category',blogController.viewBlogByCategory);

app.put(baseUrl+'/edit/:blogId',blogController.editBlog);

app.post(baseUrl+'/delete/:blogId',blogController.deleteBlog);

app.post(baseUrl+'/create',blogController.createBlog);

app.get(baseUrl+'/:blogId/count/view',blogController.increaseBlogView);

}
module.exports = {
    setRouter: setRouter
}