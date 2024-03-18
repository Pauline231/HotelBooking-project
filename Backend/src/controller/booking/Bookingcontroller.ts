import { Request, Response} from 'express'
import Hotel, { Booking } from '../../model/hotelmodel'
import User from '../../model/usermodel'

export const createBooking = async(req:Request, res: Response )=>{
    const userId = req.userId
    const hotelId = req.params.id
    const hotel = await Hotel.findById(hotelId)
    if(!hotel){
        return res.status(400).json({
            message : "No hotel found with that id."
        })
    }
    const user = await User.findById(userId)
    if(!user) {
     return res.status(400).json({
        message :"Please log in first."
     })   
    }
    const newBooking = await Booking.create({
        ...req.body,
        userId: userId,
    })
    user.bookings.push(newBooking)
    await user.save()
    res.status(201).json(newBooking)
}

export const fetchMyBookings = async(req: Request, res:Response)=>{
    const userId = req.userId
    const user = await User.findById(userId).populate({
        path : "bookings",
        populate : {
            path : "hotelId"
        }
    })
    if(!user){
        return res.status(400).json({
            message : "Please log in first."
        })
    }
    return res.status(200).json(user)
}