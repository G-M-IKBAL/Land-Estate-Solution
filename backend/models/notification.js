const mongoose = require('mongoose');


notification = new mongoose.Schema({
    text:
    { type: String, required: true },
    type:
    { type: String, required: true },
    date: 
    { type: Date, required: true }
})

const NotificationModel = mongoose.model('Notifications', notification);
module.exports = NotificationModel