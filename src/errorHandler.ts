import {Response, Request, NextFunction} from "express"

type CustomRules = {
    match:any,
    statusCode:number,
    message:string
}

type ErrorConfig = {
    customRules:CustomRules[],
    defaultMessage?:string
}



export const errorHandler = (config:ErrorConfig) => {
    return (err:Error, req:Request, res:Response, next:NextFunction) => {
        let configErrors = config.customRules
        let defaultMessage = config.defaultMessage

        for (let i = 0; i < configErrors.length; i++) {
            const error = configErrors[i];
            const { match, statusCode, message } = error
            if (match(err)) {
                return res.status(statusCode).send({
                    status: String(statusCode).startsWith("4") ? "fail" : "error",
                    message
                })
            }
        }

        return res.status(500).send({
            status: "error",
            message: defaultMessage ? defaultMessage : "Internal Server Error"
        })
    }
}