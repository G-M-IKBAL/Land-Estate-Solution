const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employee = new Schema({
    name: { type: String, required: true},
    contact: { type: String },
    CNIC: { type: String },
    address : {type: String},
})


const EmployeeModel = mongoose.model('Employee', employee)
module.exports = EmployeeModel