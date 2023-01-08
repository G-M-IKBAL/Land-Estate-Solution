const mongoose = require('mongoose')
const Schema = mongoose.Schema

const admin = new Schema({
    name: { type: String, require: true},
    contact: { type: String },
    CNIC: { type: String },
    address : {type: String}
})


const AdminModel = mongoose.model('Admin', admin)
module.exports = AdminModel