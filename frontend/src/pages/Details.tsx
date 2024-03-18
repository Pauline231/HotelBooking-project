import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import { AiFillStar } from "react-icons/ai"
import GuestInfoForm from '../forms/ManageHotel/GuestInfoForm'


const Details = ()=>{
    const hotelId = useParams().id
    const {data : hotel} = useQuery("fetchHotelDetailbyId",()=>
        apiClient.fetchHotelDetail(hotelId?.toString() as string),
        {
            enabled: !!hotelId
        }
    )
    if(!hotel){
        return <></>
    }
    
    return (
        <div className="space-y-6">
            <div>
                <span className="flex">
                    {Array.from({length: hotel.starRating}).map(()=>(
                        <AiFillStar className="fill-yellow-400" />
                    ))}
                </span>
                <h1 className="font-montserrat font-bold">{hotel.name}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {hotel.imageUrls.map((image)=>(
                    <div className="h-[300px]">
                        <img src={image} alt={hotel.name} className="rounded-md w-full h-full object-cover object-center"/>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                {hotel.facilities.map((facility)=>(
                    <div className="border border-slate-300 font-montserrat rounded-sm p-3">
                        {facility}
                    </div>
                ))}
            </div>
            <div className="gap-2 grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                <div className="whitespace-pre-line font-montserrat flex-1 lg:self-stretch">{hotel.description}</div>
                    <div className="">
                    <GuestInfoForm
                    pricePerNight={hotel.pricePerNight}
                    hotelId={hotel._id}/>
                    </div>
            </div>
        </div>
    )
}
export default Details