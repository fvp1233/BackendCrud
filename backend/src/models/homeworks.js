/*
tittle,
description,
dueDate,
priority,
status
*/

import { Schema, model } from "mongoose";

const homeworkSchema = new Schema({
    tittle: {
        type: String
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date
    },
    priority: {
        type: String
    },
    status: {
        type: String
    }
},{
    timestamps: true,
    strict: false
});
export default model ("homeworks", homeworkSchema)