import Hotel from '../../model/hotelmodel'
import {Request, Response} from 'express'


export const fetchHotelDetail = async(req: Request, res:Response) =>{
    const id = req.params.id
    const hotel = await Hotel.findById(id)
    if(!hotel){
        res.status(403).json({
            message : "No hotel found with that id."
        })
    }
    res.status(200).json(hotel)
}
