const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://st0706:cawDwSobCVGm3HpR@cluster0.pz1jz6y.mongodb.net/blog', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect Successfully');
    }
    catch (err) {
        console.log('Connect Error:');
    }
}

module.exports = { connect }