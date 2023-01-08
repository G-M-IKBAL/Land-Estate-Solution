const mongoose = require('mongoose');


receipt = new mongoose.Schema({
    to:
    { type: mongoose.Schema.ObjectId, required: true, ref: "Customers" },
    from:
    { type: mongoose.Schema.ObjectId, required: true, ref: "Employee" },
    project:
    { type: mongoose.Schema.ObjectId, required: true, ref: "Towns" },
    receiptType: 
    { type: String, required: true },
    date: 
    { type: Date, required: true },
    amount:
    { type: String, required: true }

})

const ReceiptModel = mongoose.model('Receipts', receipt);
module.exports = ReceiptModel