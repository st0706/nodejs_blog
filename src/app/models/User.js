const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');


const User = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String }

}, { timestamps: true })

//add plugin
User.plugin(
    mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
})


module.exports = mongoose.model('User', User);