const mongoose = require('mongoose')
const Schema = mongoose.Schema

const property = new Schema({
    employeeId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "employees"
    },
    customerId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "customers"
    },
    townId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        // ref: "towns"
    },
    area: {
        type: Number,
        required: true
    },
    ratePerMarla: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    plotNumber: {
        type: String,
        required: true
    },
    plotType: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true
    },
    monthlyRent: {
        type: String,
        required: true
    },
    advance:{
        type: String, 
        reuired: true
    }
}, {
    timestamps: true
})

const PropertyModel = mongoose.model('Property', property)
module.exports = PropertyModel