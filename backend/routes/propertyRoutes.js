const express = require('express')

const router = express.Router()

const getValidation = require('../controllers/clientControler')
const PropertyBooking = require('../controllers/PropertyBookingController')
const Property = require('../controllers/Property')


router.post('/valid', getValidation)
router.post('/register', (req, res) => {
    ({cnic, project, ptype, plotno, rate, area, total, duration, rent, date} = req.body)
    properties = new Property('1', project, area, rate, ptype, '1')

    let Land = new PropertyBooking('1', properties, '1', duration, date, rent)
    Land.register()

    res.status(200).send("Success")
})

module.exports = router