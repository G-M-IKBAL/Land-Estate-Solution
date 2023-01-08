const ClientModel = require("../models/clientModel");


const getValidation = async (req, res) => {
    console.log(req.body)
    const {cnicGiven} = req.body.cnic
    const fData = await ClientModel.find({ cnic: cnicGiven })
    if (!fData) {
        return res.status(404).json({error: 'Client not exists'})
    }

    res.status(200).json(fData)
}



module.exports = getValidation
