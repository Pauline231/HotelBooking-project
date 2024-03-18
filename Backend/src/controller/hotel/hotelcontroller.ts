 import { Request, Response } from "express"
 import cloudinary from 'cloudinary'
import Hotel from "../../model/hotelmodel"
import { HotelType } from "../../shared/types";

 export const createHotel = async(req:Request, res:Response) => {
    const imageFiles = req.files as Express.Multer.File[]
    const newHotel:HotelType = req.body;
    //upload the images to cloudinary
    const imageUrls = await uploadImages(imageFiles);//extract to function in a module scope
    //updating imageUrls of the new hotel
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId
    //saving the new hotel
    const hotel = new Hotel(newHotel);
    await hotel.save();
    res.status(201).json({
        message : "Hotel created successfully.",
        data : hotel
    })
 }

 export const getMyHotel = async(req:Request, res: Response)=>{
    const userId = req.userId
    const hotel = await Hotel.find({userId : userId})
    if(!hotel){
        return res.status(400).json({
            message : "You have not posted any hotel."
        })
    }
    return res.status(200).json(hotel)
 }

 export const getMySingleHotel = async(req:Request, res:Response)=>{
    const userId = req.userId
    const hotelId = req.params.id.toString()
    const hotel = await Hotel.findOne({userId:userId, _id:hotelId })
    if(!hotel){
        return res.status(400).json({
            message : "Hotel not found."
        })
    }
    res.status(200).json(hotel)
 }

 export const updateHotel = async(req:Request, res:Response)=>{
    const userId = req.userId
    const hotelId = req.params.id.toString()
    const updatedHotel:HotelType = req.body
    const hotel = await Hotel.findByIdAndUpdate({_id:hotelId,userId:userId},updatedHotel,{new:true})
    if(!hotel){
        return res.status(404).json({
            message : "Hotel not found."
        })
    }
    const files = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(files);
    hotel.imageUrls= [...updatedImageUrls,...(updatedHotel.imageUrls || [])]
    await hotel.save();
    res.status(201).json(hotel)
 }

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export const getAllHotels = async(req: Request, res: Response)=>{
    const hotels = await Hotel.find()
    return res.status(200).json(hotels)
}