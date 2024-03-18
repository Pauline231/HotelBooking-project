import { useQuery } from "react-query"
import * as apiClient from '../api-client'
import { BookingType } from "../../../Backend/src/shared/types"


const MyBookings = () =>{
    const {data : user} = useQuery("fetchMyBookings", apiClient.fetchMyBookings,{
        onError:()=>{}
    })
    if(!user){
        return <>No Bookings found</>
    }
    const Bookings = user.bookings
    return (
        <div>
           <h2 className="font-montserrat text-3xl font-bold">My Bookings</h2> 
           <div className="flex flex-col gap-10 justify-center container"> 
            {Bookings.map((booking:BookingType)=>(
                <div className="flex flex-row gap-4 p-5">
                    <img src={booking.hotelId.imageUrls[0]} width={400} height={400} />
                    <div className="flex flex-col gap-6 justify-evenly">
                        <div className="flex flex-col gap-1">
                       <h3 className="font-montserrat font-bold text-xl">{booking.hotelId.name}</h3> 
                       <h3 className="font-montserrat">{booking.hotelId.city}, {booking.hotelId.country}</h3>
                       </div>
                       <div className="flex flex-col">
                       <span className="font-bold font-palanquin text-xl">Dates: {new Date(booking.checkIn).toLocaleDateString()} to {new Date(booking.checkOut).toLocaleDateString()}</span>
                       <span className="font-bold font-palanquin text-xl">Guests: {booking.adultCount} adults, {booking.childCount} children </span>
                       </div>
                       <div className="flex gap-1 items-center">
                        {booking.hotelId.facilities.slice(0, 3).map((facility) => (
                        <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                        {facility}
                        </span>
                        ))}
                        <span className="text-sm">
                        {booking.hotelId.facilities.length > 3 &&
                        `+${booking.hotelId.facilities.length - 3} more`}
                        </span>
                        </div>
                     </div>   
                </div>
            ))}
           </div>
        </div>
    )
}
export default MyBookings