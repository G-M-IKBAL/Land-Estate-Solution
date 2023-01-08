const mongoose = require('mongoose');

expense_Schema = new mongoose.Schema({

    date: { type: Date, require: true },
    e_id: { type: mongoose.Schema.ObjectId, require: true, ref: "Employee" },
    p_id: { type: mongoose.Schema.ObjectId, require: true, ref: "Towns" },
    amount: { type: Number, require: true },
    category: { type: String, require: true },
    description: { type: String, require: true }

})

module.exports = mongoose.model('Expenses', expense_Schema);
