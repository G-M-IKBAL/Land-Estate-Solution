

const mongoose = require('mongoose');
const DB = require('../models/Client_Schema');
const employee = require('./Employee');


class ClientRegistration {

  constructor() {
    this.savedetails;
    // this.receive;
    this.fetchdetails
    this.update_details;
    this.delete_client;

    this.check_user;
  }


  savedetails = async (Name, Contact, Cnic, Address, Gaurdian, res) => {

    //build_connection()

    const saveClient = new DB({
      name: Name,
      contact: Contact,
      cnic: Cnic,
      address: Address,
      gaurdian: Gaurdian
    })

    const response = await saveClient.save();
    res.json(response)



    //mongoose.connection.close()

  }


  // fetchdetails = async (req, res, next) => {
  //   //  build_connection()
  //   const getvalues = await DB.find().exec();


  //   //mongoose.connection.close()

  //   return Promise.resolve(getvalues)

  // }


  // update_details = async (Name, Contact, Cnic, Address, Email, User_id, res) => {


  //   //build_connection()

  //   const value = await DB.updateOne({ user_id: User_id },
  //     { name: Name, contact: Contact, cnic: Cnic, address: Address, email: Email }).then(function () {


  //       res.send("ok")


  //     }).catch(function (error) {
  //       console.log(error); // Failure

  //     });

  //   return Promise.resolve(value)


  // }


  // delete_client = async (User_id, res) => {

  //   //build_connection()

  //   DB.deleteOne({ user_id: User_id }).then(function () {
  //     console.log("Data deleted"); // Success
  //     res.send("Data Deleted Succefull")

  //   }).catch(function (error) {
  //     console.log(error); // Failure

  //   });

  //   //mongoose.connection.close()

  // }


}

const caller = new ClientRegistration;

exports.savedetails = caller.savedetails;
// exports.fetchdetails = caller.fetchdetails;
// exports.update_details = caller.update_details;
// exports.delete_client = caller.delete_client;

