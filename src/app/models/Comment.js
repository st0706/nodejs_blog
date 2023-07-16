const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete');
const User = require('./User')
const Blog = require('./Blog')

const Comment = new Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }
}, { timestamps: true })

//add plugin
Comment.plugin(
    mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Comment', Comment);