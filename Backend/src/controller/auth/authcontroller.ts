import User from "../../model/usermodel"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import {body, validationResult} from 'express-validator'
import bcrypt from 'bcryptjs'

export const registerUser = async(req : Request, res: Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message : errors})
    }
    const {email, firstName, lastName, password} = req.body
    if(!email||!firstName||!lastName||!password){
        return res.status(400).json({
            message : "Please provide all details"
        })
    }
    let user = await User.findOne({
        email : req.body.email
    })
    if(user){
        return res.status(400).json({
            message : "user with that email already exists"
        })
    }
    user = new User(req.body);
    await user.save()
    const token = jwt.sign({userId: user.id},process.env.JWT_SECRET_KEY as string,
        {
            expiresIn: '2d'
        });
    res.cookie("auth_token",token,{
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        maxAge : 172800000
        })

    res.status(200).json({
        message : "user registered succesfully"
    })
}

export const loginUser = async(req:Request, res:Response)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            message : errors
        })
    }
    const {email, password} = req.body
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(400).json({
            message : "Invalid credentials"
        })
    }
    const isMatch = bcrypt.compareSync(password, user.password)
    if(!isMatch){
        return res.status(400).json({
            message : "Invalid Password."
        })
    }
    const token = jwt.sign({userId : user.id},process.env.JWT_SECRET_KEY as string,{
        expiresIn : '2d'
    })
    res.cookie("auth_token", token,{
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        maxAge : 172800000
    })
    res.status(200).json({
        message : "User logged in successfully."
    })
}

export const LogOut = async(req: Request, res:Response)=>{
    res.cookie("auth_token","",{
        expires: new Date(0)
    })
    res.status(200).json({
        message : "Log out successfull"
    })
}

export const fetchUser = async (req: Request, res: Response)=>{
    const userId = req.userId
    const user = await User.findById(userId)
    if (!user) {
        return res.status(403).json({
            message : "User not found with that id."
        })
    }
    res.status(201).json(user)
}