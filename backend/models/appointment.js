const mongoose = require('mongoose');


appointment = new mongoose.Schema({
    title: 
    { type: String, required: true },
    project: 
    { type: Date, required: true },
    description:
    { type: String, required: true },
    date:
    { type: Date, required: true},
    for:
    { type: String, required: true},
    employeeMessage:
    { type: String },
    employeeDate:
    { type: Date}

})

const AppointmentModel = mongoose.model('Appointment', appointment);
module.exports = AppointmentModel