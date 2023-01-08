const express = require('express')

const router = express.Router()


const employee = require('../controllers/Employee')
const login_caller = require('../controllers/Login')

router.post('/clients', employee.Client_data);

// router.post('/update', employee.update_details);

// router.post('/delete', employee.delete_client);

router.post('/installments', employee.installments);

router.post('/expenses', employee.expenses);

// router.get('/clients',employee.fetch_Client_data);






module.exports = router