
const PropertyModel = require('../models/property')
const ReceiptModel = require('../models/receipt')

class Property {

    register(eidG, cidG, tidG, ptypeG, plotnoG, rateG, areaG, totalG, durationG, rentG, dateG, advanceG) {
        return new Promise((resolve, reject) => {
            const p = new PropertyModel({
                employeeId: eidG,
                customerId: cidG,
                townId: tidG,
                area: areaG,
                ratePerMarla: rateG,
                totalAmount: totalG,
                plotNumber: plotnoG,
                plotType: ptypeG,
                duration: durationG,
                registrationDate: dateG,
                monthlyRent: rentG,
                advance: advanceG
            })
            p.save()
                .then((result) => {
                    const q = new ReceiptModel({
                        to: cidG,
                        from: eidG,
                        project: tidG,
                        receiptType: 'Registration',
                        date: dateG,
                        amount: advanceG
                    })
                    q.save()
                        .then((result) =>
                        {
                            resolve('{\'msg\': \'Property Added\'}')
                        })
                        .catch((err) => {
                            resolve('{\'msg\': \'Property Added\'}')
                        })
                })
                .catch((err) => {
                    reject('{\'msg\': \'Property not Added\'}')
                })

        })
    }
};

module.exports = Property