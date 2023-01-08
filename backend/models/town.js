const mongoose = require('mongoose');


town = new mongoose.Schema({
    name:
    { type: String, require: true },
    location:
    { type: String, require: true },
    eid:
    { type: mongoose.Schema.ObjectId, required: true, ref: "employees" },
})

const TownModel = mongoose.model('Towns', town);
module.exports = TownModel