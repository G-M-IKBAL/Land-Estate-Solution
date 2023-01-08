const mongoose=require('mongoose');


installments_Schema=new mongoose.Schema(
    {
        date:{type:Date,require:true},
        e_id:{type: mongoose.Schema.ObjectId,require:true, ref: "Employee"},
        c_id:{type: mongoose.Schema.ObjectId,require:true, ref: "Customers"},
        p_id:{type: mongoose.Schema.ObjectId,require:true, ref: "Towns"},
        amount:{type:Number,require:true},
        propertyId:{type: mongoose.Schema.ObjectId, ref: "Property"}
    }
)


module.exports=mongoose.model('Installments',installments_Schema);