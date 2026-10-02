class AppError extends Error {

    public status:string
    public isOperational:boolean
    public timestamp:string


    constructor (message:string, public statusCode:number) {
        super(message)

        this.status = String(statusCode).startsWith("4") ? "fail" : "error"
        this.isOperational = true
        this.timestamp = new Date().toISOString();

        (Error as any).captureStackTrace(this, this.constructor)
    }
}

export default AppError