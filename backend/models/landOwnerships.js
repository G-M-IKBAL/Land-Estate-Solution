const mongoose = require('mongoose')
const Schema = mongoose.Schema

const landownerships = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    customerId: {
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
    }

}, {
    timestamps: true
})

const LandOwnershipModel = mongoose.model('LandOwnerships', landownerships)
module.exports = LandOwnershipModel