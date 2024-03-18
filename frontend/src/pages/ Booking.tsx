import { useQuery } from "react-query"
import * as apiClient from "../api-client"
import { useParams } from "react-router-dom"
import BookingForm from "../forms/BookingForm/BookingForm"
import { useSearchContext } from "../context/SearchContext"
import { useEffect, useState } from "react"
import BookingDetailsSummary from "../components/BookingDetailsSummary"



const Booking = ()=>{
    const search = useSearchContext()

    const [numberOfNights, setNumberOfNights] = useState<number>(0)
     
    useEffect(()=>{
        if(search.checkIn && search.checkOut){
            const nights = Math.abs(search.checkOut.getTime()-search.checkIn.getTime())/ (1000*60*60*24)
            if(nights >=1){
                setNumberOfNights(Math.ceil(nights))
            }else{
                setNumberOfNights(1)
            }
           
        }
    },[search.checkIn, search.checkOut])

    const hotelId = useParams().id
    const {data : hotel} = useQuery("fetchHotel",()=> 
    apiClient.fetchHotelDetail(hotelId as string),{
        enabled : !!hotelId
    })
    const {data :user} = useQuery("fetchUser",apiClient.fetchUser) 
    
    
    
    return (
        <div className="grid md:grid-cols-[1fr_2fr] gap-4">
           {hotel &&
           <BookingDetailsSummary 
           checkIn = {search.checkIn}
           checkOut = {search.checkOut}
           adultCount = {search.adultCount}
           childCount = {search.childCount}
           numberOfNights = {numberOfNights}
           hotel = {hotel}
           />} 
           
            {user && hotel && <BookingForm currentUser={user} hotel={hotel} numberOfNights= {numberOfNights} />}
         

        </div>
    )
}
export default Booking