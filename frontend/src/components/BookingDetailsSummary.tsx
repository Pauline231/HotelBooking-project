import { HotelType } from "../../../Backend/src/shared/types"


type Props = {
    checkIn : Date,
    checkOut : Date,
    adultCount :number,
    childCount :number,
    numberOfNights : number,
    hotel : HotelType
}

const BookingDetailsSummary = ({checkIn, checkOut, adultCount,childCount, numberOfNights,hotel}: Props)=>{
    return (
        <div className="flex flex-col gap-4 border rounded-xl border-gray-300 p-8">
            <h2 className="font-montserrat font-bold">Your Booking Details</h2>
            <div className="flex flex-col border-b border-gray-300">
             <h4 className="font-montserrat">Location</h4>
             <span className="font-palanquin font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</span>
            </div>
            <div className="flex flex-row justify-between border-b border-gray-300 ">
                <div className="flex-1">
                <h4 className="font-montserrat">CheckIn</h4>
                <span className="font-palanquin font-bold">{checkIn.toDateString()}</span>
                </div>
                <div className="flex-1">
                <h4 className="font-montserrat">CheckOut</h4>
                <span className="font-palanquin font-bold">{checkOut.toDateString()}</span>
                </div>
            </div>
            <div className="border-b border-gray-300">
            <h4 className="font-montserrat">Total length of Stay</h4>
             <span className="font-palanquin font-bold">{numberOfNights} nights</span>
            </div>
            <div className="border-b border-gray-300">
            <h4 className="font-montserrat">Guests</h4>
             <span className="font-palanquin font-bold">{adultCount} adults & {childCount} Children</span>
            </div>

           
            <div className="flex flex-row justify-between">


            </div>
        </div>
    )
}

export default BookingDetailsSummary