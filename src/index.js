import dotenv from "dotenv";
import {app} from "./app.js"

import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

const PORT = process.env.PORT || 4000;

connectDB()
.then(() =>{
    app.listen(PORT , () =>{
        console.log(`Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB connection is failed !!!" ,err);
})
// this is also a way of connecting db with mongo but not so modular 
/*
import express from "express";
const app = express()
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error" ,(error) => {
            console.log("ERRR : " ,error);
            throw error 
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR : ",error)
        throw err
    }
})()
*/