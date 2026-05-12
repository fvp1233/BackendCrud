import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../../config.js"
import studentsModel from "../models/students.js"

const loginStudentsController = {};

loginStudentsController.login = async(req, res) =>{
    try {
        const {email, password} =req.body;
        const studentFound = await studentsModel.findOne({email})

        if(!studentFound){
            return res.status(400).json({message: "Student not found"})
        }

        const isMatch = bcrypt.compare(password, studentFound.password)

        if(!isMatch){
            studentFound.loginAttemps = (studentFound.loginAttemps || 0) +1
            if(studentFound.loginAttemps >=5){
                studentFound.timeOut = Date.now() + 5 *60 *1000;
                studentFound.loginAttemps = 0;

                await studentFound.save();
                return res.status(403).json({message: "Student blocked for many attemps"});
            }
            await studentFound.save();
            return res.status(400).json({message: "Wrong password"});
        }
        studentFound.loginAttemps = 0;
        studentFound.timeOut = null;

        const token = jsonwebtoken.sign(
            {id: studentFound._id , userType: "student"},
            config.JWT.secret,
            {expiresIn: "15m"}
        )
        res.cookie("AuthCookie" , token);
        return res.status(200).json({message: "Login succesfully"})
        
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"});
    }
};

export default loginStudentsController