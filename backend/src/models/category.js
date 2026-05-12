/*
categoryName,
description,
color,
isActive
*/

import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    categoryName: {
        type: String
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    isActive: {
        type: Boolean
    }
})
export default model ("category", categorySchema)