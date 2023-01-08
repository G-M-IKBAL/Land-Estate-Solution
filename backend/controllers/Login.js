
const mongoose = require("mongoose");
const DB = require("../models/Login_Schema")

class Login {
    constructor() {
        this.Login;
    }

    login = async (req, res, next) => {

        // build_connection
        const login = new DB(
            {
                person_id: req.body.person_id,
                role: req.body.role,
                user: req.body.user,
                passwd: req.body.passwd

            }
        )

        const name = "testing6";
        const p = "4455";

        const user = await DB.findOne({ user: name }).select("user").lean();
        const passwd = await DB.findOne({ passwd: p }).select("passwd").lean();


        if (user && passwd) {

            const id = await DB.findOne({ person_id: req.body.person_id }).select("person_id").lean();
            const role = await DB.findOne({ role: req.body.role }).select("role").lean();
            console.log("User Already exist")

            //res.send(result)
            res.json({ id, role })



        }
        else {

            //   const response=await login.save();
            //   res.json(response)
            res.send("user not exist")

        }


        // const userExist = await DB.exists({ req.body.user });

        //   if (userExist)
        //           return res.status(400).send({ message: "User already exists" });

    }


    isValid(givenUsername, givenPassword)
    {
        return new Promise((resolve, reject) => {
            DB.find({user: givenUsername, passwd: givenPassword})
                .then((result) => {
                    resolve(JSON.stringify({'id': result[0].person_id, 'role': result[0].role}))
                })
                .catch((err) => {
                    reject(JSON.stringify({'id': 'null'}))
                })
        })
    }


}

const caller = new Login;
exports.login = caller.login;

module.exports = Login