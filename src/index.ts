import AppError from "./AppError";
import { errorHandler } from "./errorHandler";
import { tryCatch } from "./tryCatch";

import express, {Request, Response, NextFunction} from "express"

const app = express()

app.use(express.json())

app.get("/test", tryCatch(async(req:Request,res:Response,next:NextFunction)=>{
    await new Promise((resolve,reject)=>{
        setTimeout(()=>reject(new AppError("Async db timeout", 400)), 1000)

    })
    res.status(200).json({
        status:"Passed",
        data:"This will not be reached"
    })
},true))

app.use(errorHandler({
    customRules:[
        {
            match:(err:any)=> err.code == "DB_ERROR",
            statusCode:500,
            message:"Database is currently unavailable"
        }
    ],
    defaultMessage:"Are u serious"
}))

app.listen(3000, ()=>{
    console.log("Test Sever running")
})