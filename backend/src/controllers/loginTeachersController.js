import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../../config.js"
import teacherModel from "../models/teachers.js"

const loginTeachersController = {};

loginTeachersController.login = async(req, res) =>{
    try {
        const {email, password} =req.body;
        const teacherFound = await teacherModel.findOne({email})

        if(!teacherFound){
            return res.status(400).json({message: "Teacher not found"})
        }

        const isMatch = bcrypt.compare(password, teacherFound.password)

        if(!isMatch){
            teacherFound.loginAttemps = (teacherFound.loginAttemps || 0) +1
            if(teacherFound.loginAttemps >=5){
                teacherFound.timeOut = Date.now() + 5 *60 *1000;
                teacherFound.loginAttemps = 0;

                await teacherFound.save();
                return res.status(403).json({message: "Teacher blocked for many attemps"});
            }
            await teacherFound.save();
            return res.status(400).json({message: "Wrong password"});
        }
        teacherFound.loginAttemps = 0;
        teacherFound.timeOut = null;

        const token = jsonwebtoken.sign(
            {id: teacherFound._id , userType: "teacher"},
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
export default loginTeachersController