const express = require('express')
const router = express.Router()
const Admin = require('../controllers/Admin')
const Login = require('../controllers/Login')


router.post('/', (req, res) => {
    ({username, password} = req.body)
    const p = new Login
    p.isValid(username, password)
       .then((result) => {
        console.log(result);
            res.status(200).send(result)
       })
       .catch((error) => {
            console.log(error);
            res.status(400).send(error)
       })
})

module.exports = router