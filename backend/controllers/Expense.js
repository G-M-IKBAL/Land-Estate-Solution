const mongoose=require('mongoose');
const DB=require('../models/Expenses_Schema');

const employee=require('./Employee');


class Expense{
    constructor(){

        this.add_expense;

    }
add_expense=async (Date,E_id,P_id,Category,Description,Amount,res) =>{
//build_connection()
    const Add=new DB({

        date:Date,
        e_id:E_id,
        p_id:P_id,
        category:Category,
        description:Description,
        amount:Amount

    })

    const response=await Add.save();
    res.json(response)
    console.log("good to go")
   //mongoose.connection.close()
}


}


const caller=new Expense;

exports.add_expense=caller.add_expense;