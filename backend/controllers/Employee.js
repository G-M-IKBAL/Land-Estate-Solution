
const mongoose=require('mongoose');

const Client=require('./Client')
const installment_caller=require('./installments')
const expense_caller=require('./Expense')

class Employee{


    constructor(){

        this.received;
        this.result;

        this.Client_data; 
        this.fetch_Client_data;
        this.update_details;
        this.delete_client;
        this.installments;
        this.expenses;
        this.finance;
   
       
}

// finance=async (req,res,next)=>{
    
//     finance_caller.finance(amount)
// }

Client_data=async (req,res,next)=>{

    const { name,contact,cnic,address,gaurdian} = req.body
   
// console.log(res.body)
Client.savedetails(name,contact,cnic,address,gaurdian,res);


}

fetch_Client_data=async (req,res,next)=>{

  Client.fetchdetails(res).then((result) => res.json(result));
  
  //console.log(result)
    
}

update_details=async (req,res,next)=>{
    const {name,contact,cnic,address,email,user_id} = req.body

    Client.update_details(name,contact,cnic,address,email,user_id,res)

}

delete_client=async (req,res,next)=>
{
    const {user_id}=req.body

    Client.delete_client(user_id,res);
}



///////////// installlment functions 

installments=async (req,res,next) => {

    
    const {date,e_id,c_id,amount,p_id}=req.body
    //finance_caller.finance_calculation(amount)
    
    installment_caller.add_installments(date,e_id,c_id,amount,p_id,res)
    // finance(amount)

    //const add=new  installments_Schema
}


expenses=async (req,res,next)=>{
    const {date,e_id,p_id,category,description,amount}=req.body

 expense_caller.add_expense(date,e_id,p_id,category,description,amount,res)
}


}
const caller=new Employee;

exports.registerClient=caller.registerClient;
exports.Client_data=caller.Client_data;
exports.fetch_Client_data=caller.fetch_Client_data;
exports.update_details=caller.update_details;
exports.delete_client=caller.delete_client;
exports.installments=caller.installments;
exports.expenses=caller.expenses;