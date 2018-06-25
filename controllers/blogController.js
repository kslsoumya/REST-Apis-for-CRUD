
const mongoose = require('mongoose')
const express = require('express')
const BlogModel = mongoose.model('Blog')
const shortId = require('shortid');
const generateResponse = require('../libs/responseLib')
const timeLib = require('../libs/timeLib')
const checkLib = require('../libs/checkLib')
const logger = require('../libs/loggerLib')


let getAllBlogs = (req, res) => {

    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.captureerror(`Some Error Occured ${err}`, 'controller:getAllBlogs',10)
                let apiResponse = generateResponse.generate(true, 'Some Error Occured !!', 500, err)
                res.send(apiResponse)
            } else if (checkLib.isEmpty(result)) {
                let apiResponse = generateResponse.generate(ture, 'No Data Found!!', 404, err)
                res.send(apiResponse)
                logger.captureInfo('No Blog Found!!','controller:getAllBlogs',10)
            } else {
                logger.captureInfo('Blog Found Successfully!!','controller:getAllBlogs',10)
                let apiResponse = generateResponse.generate(false, 'Blogs Found Successfully !!', 200, result)
                res.send(apiResponse)
            }
        })

}
let viewBlogById = (req, res) => {
    console.log(req.user)
    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:viewBlogById',10)
            let apiResponse = generateResponse.generate(true, 'Some Error Occured', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = generateResponse.generate(true, 'Blog Not Found', 404, err)
            res.send(apiResponse)
            logger.captureInfo('No Blog Found!!','controller:viewBlogById',10)
        } else {
            logger.captureInfo('Blog Found Successfully!!','controller:viewBlogById',10)
            let apiResponse = generateResponse.generate(false, 'Blog Found Sucessfully !!', 200, result)
            res.send(apiResponse)
        }
    })

}

let viewBlogByAuthor = (req, res) => {
    BlogModel.find({ 'author': req.params.author }, (err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured:${err}`, 'controller:viewBlogByAuthor',10)
            let apiResponse = generateResponse.generate(true, 'Some Error Occured', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = generateResponse.generate(false, 'No Blog Found !!', 404, err)
            res.send(apiResponse)
            logger.captureInfo('No Blog Found!!','controller:viewBlogByAuthor',10)
        } else {
            logger.captureInfo('Blog Found Successfully!!','controller:viewBlogByAuthor',10)
            let apiResponse = generateResponse.generate(true, 'Blog Found Successfully!!', 200, result)
            res.send(apiResponse)
        }
    })

}
let viewBlogByCategory = (req, res) => {
    BlogModel.find({ 'category': req.params.category }, (err, result) => {

        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:viewBlogByCategory',10)
            let apiResponse = generateResponse.generate(true, 'Some Error Occured', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = generateResponse.generate(true, 'No Blog Found', 404, err)
            res.send(apiResponse)
            logger.captureInfo('No Blog Found!!','controller:viewBlogByCategory',10)
        } else {
            logger.captureInfo('Blog Found Successfully!!','controller:viewBlogByCategory',10)
            let apiResponse = generateResponse.generate(false, 'Blog Found Successfully!!', 200, result)
            res.send(apiResponse)
        }
    })

}

let deleteBlog = (req, res) => {
    BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:deleteBlog',10)
            let apiResponse = generateResponse.generate(true, 'Some Error Occured !!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = generateResponse.generate(true, 'No Blog Found', 404, err)
            res.send(apiResponse)
            logger.captureInfo('No Blog Found!!','controller:deleteBlog',10)
        } else {
            logger.captureInfo('Blog Deleted Successfully !!','controller:deleteBlog',10)
            let apiResponse = generateResponse.generate(false, 'Blog Deleted Successfully !!', 200, result)
            res.send(apiResponse)
        }

    })

}
let editBlog = (req, res) => {
    let options = req.body;

    BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:editBlog',10)
            let apiResponse = generateResponse.generate(true, 'Some error Occured!!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            logger.captureInfo('No Blog Found!!','controller:editBlog',10)
            let apiResponse = generateResponse.generate(true, 'No Blog Found', 404, err)
            res.send(apiResponse)
        } else {
            logger.captureInfo('Blog edited Successfully !!','controller:editBlog',10)
            let apiResponse = generateResponse.generate(false, 'Blog edited Successfully !!', 200, result)
            res.send(apiResponse)
        }
    });

}
let increaseBlogView = (req, res) => {
    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:increaseBlogView',10)
            let apiResponse = generateResponse.generate(true, 'Some error Occured !!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            logger.captureInfo('No Blog Found!!','controller:editBlog',10)
            let apiResponse = generateResponse.generate(true, 'No Blog Found', 404, err)
            res.send(apiResponse)
        } else {
            result.views += 1;
            result.save((err, result) => {
                if (err) {
                    logger.captureerror('Some Error Occured', 'controller:increaseBlogView',5)
                    let apiResponse = generateResponse.generate(true, 'Some error Occured !!', 500, err)
                    res.send(apiResponse)
                }
                else {
                    logger.captureInfo('Blog updated successfully','controller:increaseBlogView',10)
                    let apiResponse = generateResponse.generate(false, 'Blog Views increased Successfully!!', 200, result)
                    res.send(apiResponse)
                }
            })


        }
    })

}
let createBlog = (req, res) => {
    var today = timeLib.convertToLocalTime;
    const blogId = shortId.generate();

    let newBlog = new BlogModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: today,
        lastModified: today
    })

    let tags = ((req.body.tags !== undefined && req.body.tags !== '' && req.body.tags !== null) ? req.body.tags.split(',') : []);
    newBlog.tags = tags;

    newBlog.save((err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:createBlog',10)
            let apiResponse = generateResponse.generate(true, 'Some Error Occured', 500, err)
            res.send(apiResponse)
        } else {
            let apiResponse = generateResponse.generate(false, 'Blog Created Successfully!!', 200, result)
            res.send(apiResponse)
        }
    })
}



module.exports = {
    getAllBlogs: getAllBlogs,
    viewBlogByAuthor: viewBlogByAuthor,
    viewBlogByCategory: viewBlogByCategory,
    viewBlogById: viewBlogById,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView,
    createBlog: createBlog
}