
const mongoose = require('mongoose')
const express = require('express')
const BlogModel = mongoose.model('Blog')
const shortId = require('shortid')

let getAllBlogs = (req,res) =>{

BlogModel.find()
            .select('-__v -_id')
            .lean()
            .exec((err,result) =>{
                if(err) {
                    console.log(eror);
                    res.send(err)
                } else if(result === undefined || result === null || result === '') {
                    res.send('No Blogs Found !!!')
                    console.log('No Blogs Found !!')
                } else {
                    res.send(result)
                }
            })
    
}
let viewBlogById = (req,res) =>{
    console.log(req.user)
    BlogModel.findOne({'blogId' : req.params.blogId},(err,result)=>{
        if(err) {
            console.log(err);
            res.send(err);
        } else if(result === undefined || result === null || result === '') {
            res.send('No Blog Found !!!')
            console.log('No Blog Found !!')
        } else {
            res.send(result)
        }
    }) 

}

let viewBlogByAuthor = (req,res)=>{
    BlogModel.find({'author' : req.params.author},(err,result)=>{
        if(err) {
            console.log(err);
            res.send(err);
        } else if(result === undefined || result === null || result === '') {
            res.send('No Blog Found !!!')
            console.log('No Blog Found !!')
        } else {
            res.send(result)
        }
    }) 

}
let viewBlogByCategory = (req,res)=>{
    BlogModel.find({ 'category': req.params.category }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })

}

let deleteBlog = (req,res) =>{
    BlogModel.remove({'blogId': req.params.blogId},(err,result) =>{
        if(err) {
            console.log(err);
            res.send(err);
        } else if(result === undefined || result === null || result === '') {
            res.send('No Blog Found !!!')
            console.log('No Blog Found !!')
        } else {
            res.send(result)
        }

    })

}
let editBlog=(req,res) =>{
    let options = req.body;

    BlogModel.update({'blogId':req.params.blogId}, options, { multi: true }).exec((err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    });

}
let increaseBlogView = (req,res)=>{
    BlogModel.findOne({'blogId' : req.params.blogId},(err,result)=>{
        if(err) {
            console.log(err);
            res.send(err);
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        }  else {
            result.views += 1;
            result.save((err,result)=>{
                if (err) {
                    console.log(err)
                    res.send(err)
                }
                else {
                    console.log("Blog updated successfully")
                    res.send(result)

                }
            })


        }
    })

}
let createBlog = (req,res) =>{
    var  today = Date.now();
    const blogId = shortId.generate();

    let newBlog = new BlogModel({
        blogId : blogId,
        title: req.body.title,
        description : req.body.description,
        bodyHtml : req.body.blogBody,
        isPublished:true,
        category: req.body.category,
        author: req.body.fullName,
        created : today,
        lastModified:today
    })

    let tags = ((req.body.tags !== undefined && req.body.tags !== '' && req.body.tags!== null)? req.body.tags.split(','):[]);
     newBlog.tags = tags;

     newBlog.save((err,result) =>{
        if(err) {
            console.log(eror);
            res.send(err)
        }  else {
            res.send(result)
        }
     })
}



module.exports ={
    getAllBlogs : getAllBlogs,
    viewBlogByAuthor : viewBlogByAuthor,
    viewBlogByCategory:viewBlogByCategory,
    viewBlogById: viewBlogById,
    editBlog : editBlog,
    deleteBlog:deleteBlog,
    increaseBlogView : increaseBlogView,
    createBlog:createBlog
}