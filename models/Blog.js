const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let blogSchema = new Schema(
    {
        blogId:
        {
            type: String,
            unique:true
        },
        title:
        {
            type: String,
            default: ''
        },
        description:
        {
            type: String,
            default: ''
        },
        bodyHtml:
        {
            type: String,
            default: ''
        },
        views:
        {
            type: Number,
            default: ''
        },
        isPublished:
        {
            type: Boolean,
            default: false
        },
        category:
        {
            type: String,
            default: 0
        },
        author:
        {
            type: String,
            default: ''
        },
        tags:[],
        created:{
            type: Date,
            default: Date.now
        },
        modified:{
            type: Date,
            default: Date.now
        }

    })

    mongoose.model('Blog',blogSchema)

