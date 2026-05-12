/*
subjectName
teacher_id
isAvailable
*/

import mongoose, { Schema, model } from "mongoose";

const subjectSchema = new Schema({

    subjectName: {
        type: String
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers"
    },
    isAvailable:{
        type: Boolean
    }
},
{
    timestamps: true,
    strict: false
});
export default model("subjects", subjectSchema)