import { Request, Response } from "express"

//catch asynchronous error 
export const asyncCatch = (fn : any ) =>{
    return (req:Request ,res:Response, next : any)=>{
        fn(req,res,next).catch((err : any)=>{
            return res.status(500).json({
                message : err.message,
                fullError : err
            })
        })
    }
}