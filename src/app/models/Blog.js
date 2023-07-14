const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete');


const Blog = new Schema({
    blogName: {
        type: String,
        required: true
    },
    blogImage: {
        type: String,
        required: true
    },
    blogInfo: {
        type: String,
        required: true
    },
    blogType: {
        type: String,
        required: true
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

//add plugin
Blog.plugin(
    mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
})
mongoose.plugin(slug);

module.exports = mongoose.model('Blog', Blog);