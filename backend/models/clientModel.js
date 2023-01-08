const mongoose = require('mongoose')
const Schema = mongoose.Schema


const registerClient = new mongoose.Schema({
    name: { type: String, require: true, unique: true },

    contact: { type: String, require: true },
    cnic: { type: String, require: true },
    address: { type: String, reuire: true },
    email: { type: String, require: true },
})

const ClientModel = mongoose.model('Clients', registerClient)
module.exports = ClientModel
