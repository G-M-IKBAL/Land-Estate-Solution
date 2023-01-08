
const LandOwnershipModel = require('../models/landOwnerships')

class PropertyBooking{
    constructor(eid, properties, cid, duration, regDate, monthlyRent)
    {
        this.eid = eid
        this.properties = properties
        this.cid = cid
        this.duration = duration
        this.regDate = regDate
        this.monthlyRent = monthlyRent
    }

    register()
    {
        for (let i = 0; i < (this.properties).length; i++){
            (this.properties[i]).register()
        }

        const l = new LandOwnershipModel({
            employeeId: this.eid,
            customerId: this.cid,
            duration: this.duration,
            registrationDate: this.regDate,
            monthlyRent: this.monthlyRent
        })

        l.save()
            .then((result) => {
                console.log("Land Added Successfully")
                console.log(result)
            })
            .catch((err) => {
                console.log("Land Adding Error Occured")
                console.log(err)
            })

    }
};

module.exports = PropertyBooking