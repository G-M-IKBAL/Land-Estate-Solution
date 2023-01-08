const mongoose = require('mongoose');


registerClient = new mongoose.Schema(
    {
        name: { type: String, required: true },
        contact: { type: String, required: true },
        cnic: { type: String, required: true },
        address: { type: String, reuired: true },
        gaurdian: { type: String }
    }
)

module.exports = mongoose.model('Customers', registerClient);