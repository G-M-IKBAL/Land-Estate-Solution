const Login_Schema = require("../models/Login_Schema")
const AdminModel = require("../models/Admin")
const EmployeeModel = require("../models/employee")
const TownModel = require("../models/town")
const AppointmentModel = require("../models/appointment")
const ReceiptModel = require("../models/receipt")
const installments_Schema = require("../models/installments_Schema")
const Client_Schema = require("../models/Client_Schema")
const PropertyModel = require("../models/property")
const Expenses_Schema = require("../models/Expenses_Schema")
const NotificationModel = require("../models/notification")

class Admin {
    isValid(givenUsername, givenPassword) {
        return new Promise((resolve, reject) => {
            Login_Schema.find({ username: givenUsername, password: givenPassword })
                .then((result) => {
                    resolve(JSON.stringify({ 'id': result[0].person_id }))
                })
                .catch((err) => {
                    reject(JSON.stringify({ 'id': 'null' }))
                })
        })
    }

    registerEmployee(nameG, contactG, cnicG, addressG, usernameG, passwordG) {
        return new Promise((resolve, reject) => {
            const p = new EmployeeModel({
                name: nameG,
                contact: contactG,
                CNIC: cnicG,
                address: addressG
            })
            p.save()
                .then((result) => {
                    const q = new Login_Schema({
                        person_id: result._id,
                        role: 'Employee',
                        user: usernameG,
                        passwd: passwordG
                    })
                    q.save()
                        .then((result1) => {
                            resolve('{\'msg\' : \'Employee Registered\'}')
                        })
                        .catch((err1) => {
                            console.log(err1);

                            resolve('{\'msg\' : \'Employee Not Registered\'}')
                        })
                })
                .catch((err) => {
                    console.log(err);

                    reject('{\'msg\' : \'Employee Not Registered\'}')
                })
        })
    }

    registerProject(nameG, locationG, supervisorIdG) {
        return new Promise((resolve, reject) => {
            const p = new TownModel({
                name: nameG,
                location: locationG,
                eid: supervisorIdG
            })
            p.save()
                .then((result) => {
                    resolve('{\'msg\' : \'Project Registered\'}')
                })
                .catch((err) => {
                    reject('{\'msg\' : \'Project not Registered\'}')
                })
        })
    }

    getAppointments() {
        return new Promise((resolve, reject) => {
            AppointmentModel.find({ for: 'admin' })
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getEmployeeAppointments() {
        return new Promise((resolve, reject) => {
            AppointmentModel.find({ for: 'employee' })
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    resolveAppointment(idG, msgG, dateG) {
        return new Promise((resolve, reject) => {
            AppointmentModel.findByIdAndUpdate(idG, { employeeMessage: msgG, employeeDate: dateG })
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    appointmentBackToAdmin(idG) {
        return new Promise((resolve, reject) => {
            AppointmentModel.findByIdAndUpdate(idG, { for: 'admin' })
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getReceipts(dateG) {
        return new Promise((resolve, reject) => {
            ReceiptModel.find({ date: dateG }).populate("project").populate("to").populate("from")
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    console.log(err);
                    reject(err)
                })
        })
    }

    getMonthlyReport(monthG, yearG, projectId) {
        return new Promise((resolve, reject) => {

            // Finding Start and End date of the month
            var monthS
            if (monthG < 10) {
                monthS = "0" + monthG.toString()
            }
            else {
                monthS = monthG
            }
            const sDate = new Date(yearG + "-" + monthS)
            if (monthG < 12)
                monthG += 1
            else {
                monthG = 1
                yearG += 1
            }
            const eDate = new Date(((new Date(yearG + "-" + monthG)) - 1))


            installments_Schema.find({
                $and: [
                    { date: { $gte: sDate.toISOString() } },
                    { date: { $lte: eDate.toISOString() } },
                    { p_id: projectId }
                ]
            }).populate("c_id").populate("p_id").populate("propertyId")
                .then((result) => {
                    console.log(result);
                    resolve(result)
                })
                .catch((err) => {
                    console.log(err);
                    reject(err)
                })
        })
    }

    getDailyReport(dateG, projectId) {
        return new Promise((resolve, reject) => {
            installments_Schema.find({
                $and: [
                    { date: dateG },
                    { p_id: projectId }
                ]
            }).populate("c_id").populate("p_id").populate("propertyId")
                .then((result) => {
                    console.log(result);
                    resolve(result)
                })
                .catch((err) => {
                    console.log(err);
                    reject(err)
                })
        })
    }


    async getRecoveryReport(dateG) {
        var test = {}
        var allData = []
        const clientData = await Client_Schema.find()
        for (let i = 0; i < clientData.length; i += 1) {
            const propDetails = await PropertyModel.find({ customerId: clientData[i]._id })
            test.clientInfo = clientData[i]
            if (propDetails[0] === undefined)
                test.propInfo = {plotNumber: 'No Property'}
            else
                test.propInfo = propDetails[0]
            allData.push(test)
        }
        for (let i = 0; i < clientData.length; i += 1) {
            const receivedDetails = await installments_Schema.aggregate([
                {
                    $match: {
                        c_id: clientData[i]._id
                    },
                },
                {
                    $group: {
                        _id: null,
                        receivedAmount: { $sum: "$amount" }
                    }
                }
            ])
            try {
                allData[i].receivedAmount = receivedDetails[0].receivedAmount
                allData[i].leftAmount = (allData[i].propInfo.totalAmount) - allData[i].receivedAmount
                const monthsDifference = (new Date(dateG)).getMonth() - (new Date(allData[i].propInfo.registrationDate)).getMonth() + (12 * ((new Date(dateG)).getFullYear() - (new Date(allData[i].propInfo.registrationDate)).getFullYear())) + 1
                allData[i].shortAmount = (monthsDifference * allData[i].propInfo.monthlyRent) - allData[i].receivedAmount

            } catch (error) {
                allData[i].receivedAmount = 0
                allData[i].leftAmount = 0
                allData[i].shortAmount = 0
            }
        }
        console.log(test);
        return allData
    }

    getProjects() {
        return new Promise((resolve, reject) => {
            TownModel.find({})
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getClients() {
        return new Promise((resolve, reject) => {
            Client_Schema.find({})
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getIncomeStats() {
        return new Promise((resolve, reject) => {
            installments_Schema.aggregate([
                {
                    $group: {
                        _id: null,
                        totalAmount: {
                            $sum: "$amount"
                        }
                    },

                }
            ])
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    getExpenseStats() {
        return new Promise((resolve, reject) => {
            Expenses_Schema.aggregate([
                {
                    $group: {
                        _id: null,
                        totalAmount: {
                            $sum: "$amount"
                        }
                    },

                }
            ])
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    async getProjectsStats() {

        const townData = await TownModel.find({})

        const iRes = await installments_Schema.aggregate([
            {
                $group: {
                    _id: "$p_id",
                    totalAmount: {
                        $sum: "$amount"
                    }
                },

            }
        ])
        // const iRes1 = await iRes.populate("p_id")
        const eRes = await Expenses_Schema.aggregate([
            {
                $group: {
                    _id: "$p_id",
                    totalAmount: {
                        $sum: "$amount"
                    }
                },

            }
        ])
        // const eRes1 = await eRes.populate("p_id")
        var pjData = []
        for (let i = 0; i < townData.length; i++) {
            var newJson = {}
            newJson.income = 0
            newJson.expense = 0
            newJson.name = townData[i].name
            // console.log(newJson);
            for (let j = 0; j < iRes.length; j++) {
                console.log(townData[i]._id);
                console.log(iRes[j]._id);
                if (townData[i]._id.equals(iRes[j]._id)) {
                    newJson.income = iRes[j].totalAmount
                }
            }
            for (let j = 0; j < eRes.length; j++) {
                if (townData[i]._id.equals(eRes[j]._id)) {
                    newJson.expense = eRes[j].totalAmount
                }
            }
            pjData.push(newJson)
        }

        return pjData
    }

    getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', { month: 'short' });
    }

    async getProjectsStatsMonthly() {
        var barData = []
        // Getting previous 12 months
        const months = [];
        const date = new Date()
        for (let i = 0; i < 12; i++) {
            const month = new Date(date);
            month.setMonth(date.getMonth() - i);
            months.push(month);
        }
        console.log(months[0].toISOString());
        // console.log(new Date(Date.parse(`01/${months[11].getMonth()}/${months[11].getFullYear()}`)));
        // for (let i = 0; i < month.length; i++) {
        const response = await installments_Schema.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(new Date().setMonth(new Date().getMonth() - 12))
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" }
                    },
                    total: { $sum: "$amount" }
                }
            }
        ])
        console.log(response[0]._id);
        for (let i = 0; i < 12; i++) {
            let newJson = {}
            newJson.amount = 0
            newJson.month = this.getMonthName(i + 1)
            newJson.amountColor = "hsl(296, 70%, 50%)"
            barData.push(newJson)
        }

        for (let i = 0; i < response.length; i++) {
            barData[response[i]._id.month - 1].amount = response[i].total
        }

        console.log(barData);
        // }
        return barData
    }

    async getProjectWiseStatsMonthly() {
        // Getting previous 12 months
        const months = [];
        const date = new Date()
        for (let i = 0; i < 12; i++) {
            const month = new Date(date);
            month.setMonth(date.getMonth() - i);
            months.push(month);
        }
        console.log(months[0].toISOString());
        // console.log(new Date(Date.parse(`01/${months[11].getMonth()}/${months[11].getFullYear()}`)));
        // for (let i = 0; i < month.length; i++) {
        const response = await installments_Schema.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(new Date().setMonth(new Date().getMonth() - 12))
                    }
                }
            },
            {
                $group: {
                    _id: {
                        pjId: "$p_id",
                        month: { $month: "$date" },
                        year: { $year: "$date" }
                    },
                    total: { $sum: "$amount" }
                }
            }
        ])
        console.log(response);
        const townData = await TownModel.find({})
        var allData = []
        for (let i = 0; i < townData.length; i++) {
            let jsonPJ = {}
            jsonPJ.id = townData[i].name
            jsonPJ.color = "red"
            var barData = []
            for (let j = 0; j < 12; j++) {
                var newJson = {}
                newJson.x = this.getMonthName(j + 1)
                newJson.y = 0
                barData.push(newJson)
            }
            for (let k = 0; k < response.length; k++) {
                if (response[k]._id.pjId.equals(townData[i]._id)) {
                    barData[response[k]._id.month - 1].y = response[k].total
                }
            }
            jsonPJ.data = barData
            allData.push(jsonPJ)
        }
        console.log(allData);
        // for (let a = 0; a < response.length; a++) {
        //     var projectJson = {}
        //     projectJson.id = response._id.pjId
        //     projectJson.color = "red"
        //     var barData = []
        //     for (let i = 0; i < 12; i++) {
        //         var newJson = {}
        //         newJson.x = this.getMonthName(i + 1)
        //         newJson.y = 0
        //         newJson.amountColor = "hsl(296, 70%, 50%)"
        //         barData.push(newJson)
        //     }
        // }

        // for (let i = 0; i < response.length; i++) {
        //     barData[response[i]._id.month - 1].amount = response[i].total
        // }

        // console.log(barData);
        // }
        return allData
    }

    getCustomers() {
        return new Promise((resolve, reject) => {
            Client_Schema.find({})
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject((err))
                })
        })
    }

    getNotifications(dateGiven) {
        return new Promise((resolve, reject) => {
            NotificationModel.find({ date: dateGiven })
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

}

module.exports = Admin