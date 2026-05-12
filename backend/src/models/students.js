/*
name,
lastName,
email,
password,
birthDate,
phone,
grade,
isVerified,
loginAttemps,
timeOut
*/
import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type:String
    },
    birthDate: {
        type: Date
    },
    phone: {
        type: String
    },
    grade: {
        type: String
    },
    isVerified: {
        type: Boolean
    },
    loginAttemps: {
        type: Number
    },
    timeOut: {
        type: Date
    }
},{
    timestamps: true,
    strict: false
});
export default model("students", studentSchema)