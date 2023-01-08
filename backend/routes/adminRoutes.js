const express = require('express')
const router = express.Router()
const Admin = require('../controllers/Admin')
const Property = require('../controllers/Property')
const employee = require('../controllers/Employee')

const AdminModel = require('../models/Admin')

// router.post('/isValid', (req, res) => {
//     ({username, password} = req.body)
//     const p = new Admin()
//     p.isValid(username, password)
//        .then((result) => {
//             res.status(200).send(result)
//        })
//        .catch((error) => {
//             res.status(400).send(error)
//        })
// })

router.post('/registerEmployee', (req, res) => {
    ({name, contact, cnic, address, username, password} = req.body)
    const p = new Admin()
    p.registerEmployee(name, contact, cnic, address, username, password)
        .then((msg) => {
            res.status(200).send(msg)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.post('/registerClient', employee.Client_data);
router.post('/expenses', employee.expenses);
router.post('/installments', employee.installments);

router.post('/getCustomers', (req, res) => {
    const p = new Admin()
    p.getCustomers()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.post('/registerProperty', (req, res) => {
    ({eid, cid, tid, ptype, plotno, rate, area, total, duration, rent, date, advance} = req.body)
    const p = new Property()
    p.register(eid, cid, tid, ptype, plotno, rate, area, total, duration, rent, date, advance)
    .then((msg) => {
        res.status(200).send(msg)
    })
    .catch((err) => {
        res.status(404).send(err)
    })
})

router.post('/registerProject', (req, res) => {
    ({name, location, supervisorId} = req.body)
    const p = new Admin()
    p.registerProject(name, location, supervisorId)
    .then((msg) => {
        res.status(200).send(msg)
    })
    .catch((err) => {
        res.status(404).send(err)
    })
})

// appointments
// title
// concerned project
// description
// date

router.post('/getAppointments', (req, res) => {
    const p = new Admin()
    p.getAppointments()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.post('/getEmployeeAppointments', (req, res) => {
    const p = new Admin()
    p.getEmployeeAppointments()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.post('/resolveAppointments', (req, res) => {
    const p = new Admin()
    p.resolveAppointment(req.body.id, req.body.message, req.body.date)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.post('/appointmentBackToAdmin', (req, res) => {
    const p = new Admin()
    p.appointmentBackToAdmin(req.body.id)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.post('/getReceipts', (req, res) => {
    const p = new Admin()
    p.getReceipts(req.body.date)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.post('/getMonthlyReport', (req, res) => {
    const p = new Admin()
    p.getMonthlyReport(req.body.month, req.body.year, req.body.projectId)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.post('/getDailyReport', (req, res) => {
    const p = new Admin()
    p.getDailyReport(req.body.date, req.body.projectId)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.post('/getRecoveryReport', (req, res) => {
    const p = new Admin()
    const Data = p.getRecoveryReport(req.body.date, req.body.projectId)
        .then((result) => {
            res.status(200).send(result)
        })
    
})

router.post('/getProjects', (req, res) => {
    const p = new Admin()
    p.getProjects()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.post('/getClients', (req, res) => {
    const p = new Admin()
    p.getClients()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.post('/getIncomeStats', (req, res) => {
    const p = new Admin()
    p.getIncomeStats()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send(err)
        })
})

router.post('/getExpenseStats', (req, res) => {
    const p = new Admin()
    p.getExpenseStats()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send(err)
        })
})

router.post('/getProjectsStats', (req, res) => {
    const p = new Admin()
    p.getProjectsStats()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send(err)
        })
})

router.post('/getProjectsStatsMonthly', (req, res) => {
    const p = new Admin()
    p.getProjectsStatsMonthly()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send(err)
        })
})

router.post('/getProjectWiseStatsMonthly', (req, res) => {
    const p = new Admin()
    p.getProjectWiseStatsMonthly()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send(err)
        })
})

router.post('/getNotifications', (req, res) => {
    const p = new Admin()
    p.getNotifications(req.body.date)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send(err)
        })
})
module.exports = router