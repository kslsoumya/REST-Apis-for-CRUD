const express = require('express')

const auth = require('../middlewares/auth')


const blogController = require('../controllers/blogController')
const appConfig = require('../config/appConfig')
let exampleMiddleWare = require('./../middlewares/example')
let setRouter = (app) => {
    // app.get('/test/route/:param1/:param2', controller.testRoute);
    // app.get('/test/query',controller.testQuery);
    // app.post('/test/body',controller.testBody);
    let baseUrl = appConfig.apiVersion + '/blogs';

    app.get(baseUrl + '/all', auth.isAuthenticated ,blogController.getAllBlogs);


     /**
     * @api {get}  /api/v1/blogs/view/byAuthor/:author  Get Blog by Author
     * @apiVersion 0.0.1
     * @apiName Get all Blogs
     * @apiGroup read
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param)
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
     *     {
     *       "error": false,
     *       "message": " All Blogs Found Successfully",
     *        "status": 200,    
     *        "data" : [
     *                      {
     *                          blogId : "string",
*                               title:"string",
     *                          description:"string",
     *                          bodyHtml : "string",
     *                          views: number,
     *                          isPublished : boolean,
     *                          category:"string"  
     *                          author : "string",
*                               tags : object(type=array),
*                               created : "date",
     *                          lastModified: "date"
     *                    
     *                        }
     *                    ]
     *     }
     *
     * 
     *
     * @apiErrorExample  {json} Error-Response:
     *     
     *     {
     *       "error": "trur",
     *        "message": "Error Occured",
     *         "status":500,
     *          "data":null
     *     }
     */

    app.get(baseUrl + '/view/byCategory/:category',auth.isAuthenticated, blogController.viewBlogByCategory);
     /**
     * @api {get}  /api/v1/blogs/view/byCategory/:category  Get Blog by category
     * @apiVersion 0.0.1
     * @apiName Get Blog by category
     * @apiGroup read
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param)
     * @apiParam {String} category category of the blog passed as a URL parameter.
     * 
     * @apiSuccessExample {json} Success-Response:
     *     {
     *       "error": false,
     *       "message": "Blog found Successfully",
     *        "status": 200,    
     *        "data" : [
     *                      {
     *                          blogId : "string",
*                               title:"string",
     *                          description:"string",
     *                          bodyHtml : "string",
     *                          views: number,
     *                          isPublished : boolean,
     *                          category:"string"  
     *                          author : "string",
*                               tags : object(type=array),
*                               created : "date",
     *                          lastModified: "date"
     *                    
     *                        }
     *                    ]
     *     }
     *
     * 
     *
     * @apiErrorExample  {json} Error-Response:
     *     
     *     {
     *       "error": "trur",
     *        "message": "Error Occured",
     *         "status":500,
     *          "data":null
     *     }
     */

    app.get(baseUrl + '/view/:blogId', auth.isAuthenticated, blogController.viewBlogById);

     /**
     * @api {get}  /api/v1/blogs/view/:blogId  Get Blog by Author
     * @apiVersion 0.0.1
     * @apiName Get Blog by blogId
     * @apiGroup read
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param)
     * @apiParam {blogId} blogId blogId of the blog passed as a URL parameter.
     * 
     * @apiSuccessExample {json} Success-Response:
     *     {
     *       "error": false,
     *       "message": "Blog Found Successfully",
     *        "status": 200,    
     *        "data" : [
     *                      {
     *                          blogId : "string",
*                               title:"string",
     *                          description:"string",
     *                          bodyHtml : "string",
     *                          views: number,
     *                          isPublished : boolean,
     *                          category:"string"  
     *                          author : "string",
*                               tags : object(type=array),
*                               created : "date",
     *                          lastModified: "date"
     *                    
     *                        }
     *                    ]
     *     }
     *
     * 
     *
     * @apiErrorExample  {json} Error-Response:
     *     
     *     {
     *       "error": "trur",
     *        "message": "Error Occured",
     *         "status":500,
     *          "data":null
     *     }
     */

    app.get(baseUrl + '/view/byCategory/:category', auth.isAuthenticated, blogController.viewBlogByCategory);
     /**
     * @api {get}  /api/v1/blogs/view/byCategory/:category  Get Blog by category
     * @apiVersion 0.0.1
     * @apiName Get Blog by category
     * @apiGroup read
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param)
     * @apiParam {String} category category of the blog passed as a URL parameter.
     * 
     * @apiSuccessExample {json} Success-Response:
     *     {
     *       "error": false,
     *       "message": "Blog Found Successfully",
     *        "status": 200,    
     *        "data" : [
     *                      {
     *                          blogId : "string",
*                               title:"string",
     *                          description:"string",
     *                          bodyHtml : "string",
     *                          views: number,
     *                          isPublished : boolean,
     *                          category:"string"  
     *                          author : "string",
*                               tags : object(type=array),
*                               created : "date",
     *                          lastModified: "date"
     *                    
     *                        }
     *                    ]
     *     }
     *
     * 
     *
     * @apiErrorExample  {json} Error-Response:
     *     
     *     {
     *       "error": "trur",
     *        "message": "Error Occured",
     *         "status":500,
     *          "data":null
     *     }
     */

    
    app.get(baseUrl + '/view/byAuthor/:author', auth.isAuthenticated, blogController.viewBlogByAuthor);

     /**
     * @api {get}  /api/v1/blogs/view/byAuthor/:author  Get Blog by Author
     * @apiVersion 0.0.1
     * @apiName Get Blog by Author
     * @apiGroup read
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param)
     * @apiParam {author} author Author of the blog passed as a URL parameter.
     * 
     * @apiSuccessExample {json} Success-Response:
     *     {
     *       "error": false,
     *       "message": "Blog Found Successfully",
     *        "status": 200,    
     *        "data" : [
     *                      {
     *                          blogId : "string",
*                               title:"string",
     *                          description:"string",
     *                          bodyHtml : "string",
     *                          views: number,
     *                          isPublished : boolean,
     *                          category:"string"  
     *                          author : "string",
*                               tags : object(type=array),
*                               created : "date",
     *                          lastModified: "date"
     *                    
     *                        }
     *                    ]
     *     }
     *
     * 
     *
     * @apiErrorExample  {json} Error-Response:
     *     
     *     {
     *       "error": "trur",
     *        "message": "Error Occured",
     *         "status":500,
     *          "data":null
     *     }
     */

    app.get(baseUrl + '/view/byCategory/:category', auth.isAuthenticated, blogController.viewBlogByCategory);
     /**
     * @api {get}  /api/v1/blogs/view/byCategory/:category  Get Blog by category
     * @apiVersion 0.0.1
     * @apiName Get Blog by category
     * @apiGroup read
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param)
     * @apiParam {String} category category of the blog passed as a URL parameter.
     * 
     * @apiSuccessExample {json} Success-Response:
     *     {
     *       "error": false,
     *       "message": "Blog Deleted Successfully",
     *        "status": 200,    
     *        "data" : [
     *                      {
     *                          blogId : "string",
*                               title:"string",
     *                          description:"string",
     *                          bodyHtml : "string",
     *                          views: number,
     *                          isPublished : boolean,
     *                          category:"string"  
     *                          author : "string",
*                               tags : object(type=array),
*                               created : "date",
     *                          lastModified: "date"
     *                    
     *                        }
     *                    ]
     *     }
     *
     * 
     *
     * @apiErrorExample  {json} Error-Response:
     *     
     *     {
     *       "error": "trur",
     *        "message": "Error Occured",
     *         "status":500,
     *          "data":null
     *     }
     */

    app.put(baseUrl + '/edit/:blogId',auth.isAuthenticated,  blogController.editBlog);
     /**
     * @api {put}  /api/v1/blogs/edit/:blogId  Edit Blog
     * @apiVersion 0.0.1
     * @apiName Edit Blog
     * @apiGroup edit
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param,body param or header)
     * @apiParam {String} blogId blogId of the blog passed as a URL parameter.
     * 
     * @apiSuccessExample {json} Success-Response:
     *     {
     *       "error": false,
     *       "message": "Blog Edited Successfully",
     *        "status": 200,    
     *        "data" : [
     *                      {
     *                          blogId : "string",
*                               title:"string",
     *                          description:"string",
     *                          bodyHtml : "string",
     *                          views: number,
     *                          isPublished : boolean,
     *                          category:"string"  
     *                          author : "string",
*                               tags : object(type=array),
*                               created : "date",
     *                          lastModified: "date"
     *                    
     *                        }
     *                    ]
     *     }
     *
     * 
     *
     * @apiErrorExample  {json} Error-Response:
     *     
     *     {
     *       "error": "trur",
     *        "message": "Error Occured",
     *         "status":500,
     *          "data":null
     *     }
     */

    app.post(baseUrl + '/delete/:blogId',auth.isAuthenticated,  blogController.deleteBlog);
     /**
     * @api {post}  /api/v1/blogs/delete/:blogId  Delete Blog
     * @apiVersion 0.0.1
     * @apiName delete Blog
     * @apiGroup Delete
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param)
     * @apiParam {String} blogId blogId of the blog passed as a URL parameter.
     * 
     * @apiSuccessExample {json} Success-Response:
     *     {
     *       "error": false,
     *       "message": "Blog Deleted Successfully",
     *        "status": 200,    
     *        "data" : [
     *                      {
     *                          blogId : "string",
*                               title:"string",
     *                          description:"string",
     *                          bodyHtml : "string",
     *                          views: number,
     *                          isPublished : boolean,
     *                          category:"string"  
     *                          author : "string",
*                               tags : object(type=array),
*                               created : "date",
     *                          lastModified: "date"
     *                    
     *                        }
     *                    ]
     *     }
     *
     * 
     *
     * @apiErrorExample  {json} Error-Response:
     *     
     *     {
     *       "error": "trur",
     *        "message": "Error Occured",
     *         "status":500,
     *          "data":null
     *     }
     */

    app.post(baseUrl + '/create', auth.isAuthenticated, blogController.createBlog);

    /**
     * @api {post}  /api/v1/blogs/create Create Blog
     * @apiVersion 0.0.1
     * @apiName Create Blog
     * @apiGroup Create
     *
     * @apiParam {String} authToken The token for authentication.
     * @apiParam {String} title Title of the blog passed as a body parameter.
     * @apiParam {String} description Description of the blog passed as a body parameter.
     * @apiParam {String} blogBody blogBody of the blog passed as a body parameter.
     * @apiParam {String} category category of the blog passed as a body parameter.
     * 
     * @apiSuccessExample {json} Success-Response:
     *     {
     *       "error": false,
     *       "message": "Blog Created Successfully",
     *        "status": 200,    
     *        "data" : [
     *                      {
     *                          blogId : "string",
*                               title:"string",
     *                          description:"string",
     *                          bodyHtml : "string",
     *                          views: number,
     *                          isPublished : boolean,
     *                          category:"string"  
     *                          author : "string",
*                               tags : object(type=array),
*                               created : "date",
     *                          lastModified: "date"
     *                    
     *                        }
     *                    ]
     *     }
     *
     * 
     *
     * @apiErrorExample  {json} Error-Response:
     *     
     *     {
     *       "error": "trur",
     *        "message": "Error Occured",
     *         "status":500,
     *          "data":null
     *     }
     */

    app.get(baseUrl + '/:blogId/count/view',auth.isAuthenticated,  blogController.increaseBlogView);


     /**
     * @api {get}  /api/v1/blogs/:blogId/count/view Create Blog
     * @apiVersion 0.0.1
     * @apiName Increase view Count
     * @apiGroup  update
     *
     * @apiParam {String} authToken The token for authentication.
     * @apiParam {String} blogId blogId of the blog passed as a URL parameter.
     * 
     * @apiSuccessExample {json} Success-Response:
     *     {
     *       "error": false,
     *       "message": "Blog Updates Successfully",
     *        "status": 200,    
     *        "data" : [
     *                      {
     *                          blogId : "string",
*                               title:"string",
     *                          description:"string",
     *                          bodyHtml : "string",
     *                          views: number,
     *                          isPublished : boolean,
     *                          category:"string"  
     *                          author : "string",
*                               tags : object(type=array),
*                               created : "date",
     *                          lastModified: "date"
     *                    
     *                        }
     *                    ]
     *     }
     *
     * 
     *
     * @apiErrorExample  {json} Error-Response:
     *     
     *     {
     *       "error": "trur",
     *        "message": "Error Occured",
     *         "status":500,
     *          "data":null
     *     }
     */
}
module.exports = {
    setRouter: setRouter
}