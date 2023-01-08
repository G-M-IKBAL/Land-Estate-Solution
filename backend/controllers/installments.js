
const mongoose = require('mongoose');
const DB = require("../models/installments_Schema");
const NotificationModel = require('../models/notification');
const PropertyModel = require('../models/property');

const ReceiptModel = require('../models/receipt');
const employee = require('./Employee')

class installment {
    constructor() {

        this.add_installments;

    }


    add_installments = async (Date, E_id, C_id, Amount,p_idG, res) => {

        const propertyDetails = await PropertyModel.find({customerId: C_id})
        console.log(propertyDetails);
        const saveinstallment = new DB({
            date: Date,
            e_id: E_id,
            c_id: C_id,
            p_id: p_idG,
            amount: Amount,
            propertyId: propertyDetails[0]._id
        })

        const response = await saveinstallment.save();

        const p = new ReceiptModel({
            to: C_id,
            from: E_id,
            project: p_idG,
            receiptType: 'Installment',
            date: Date,
            amount: Amount
        })
        const response2 = await p.save();

        const addNot = new NotificationModel({
            text: 'An Instalment of ' + Amount + ' was added',
            type: 'instalment',
            date: Date
        })
        await addNot.save()

        res.json(response2)

    }

}

const caller = new installment;

exports.add_installments = caller.add_installments;


