import {Response, Request, NextFunction} from "express"

export const tryCatch = (callback:Function, show?:boolean)=>{
    return (req:Request,res:Response,next:NextFunction) =>{
        callback(req,res,next).catch((err:any)=>next(err))
    }
}
