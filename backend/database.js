import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/tareasDB")

const connection = mongoose.connection;
connection.once("open", () =>{
    console.log("DB is open")
})

connection.on("disconnected", () =>{
    console.log("DB is disconnected")
})

connection.on("error", (error) =>{
    console.log("Error found" + error)
})