import { useForm } from "react-hook-form"
import { HotelType, UserType } from "../../../../Backend/src/shared/types"
import { useSearchContext } from "../../context/SearchContext"
import { useMutation } from "react-query"
import * as apiClient from '../../api-client'
import { useAppContext } from "../../context/AppContext"

type Props = {
    currentUser : UserType,
    hotel : HotelType,
    numberOfNights : number
}

export type BookingFormData ={
    firstName :string, 
    lastName : string,
    email : string,
    adultCount : number,
    childCount : number,
    checkIn : Date,
    checkOut: Date,
    totalCost: number,
    hotelId : string,
}

const BookingForm = ({currentUser, numberOfNights, hotel}:Props)=>{
    const search = useSearchContext()
    const {showToast} = useAppContext()
    const {mutate, isLoading} = useMutation(
        apiClient.createBooking,
        {
            onSuccess:()=>{
                showToast({message:"Booking saved", type: "SUCCESS"})
            },
            onError:()=>{
                showToast({message:"Booking failed", type:"ERROR"})
            }
        }
    )

    const {handleSubmit, register} = useForm<BookingFormData>({
        defaultValues:{
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn : search.checkIn,
            checkOut : search.checkOut,
            totalCost: hotel?.pricePerNight *numberOfNights,
            hotelId : hotel?._id
        }
    })
    const handleBooking = (data: BookingFormData)=>{
        mutate(data)    
    }
    

    return (
        <form onSubmit={handleSubmit((data)=>handleBooking(data))} className="grid p-8 grid-cols-1 gap-5 rounded-lg border border-slate-300">
            <span className="text-3xl font-bold font-montserrat">Confirm Your Details</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-bold font-montserrat flex-1">
                First Name 
                <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
                {...register("firstName")}
                />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
            </div>
            <div className="flex justify-start">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold rounded-md hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
        </form>
    )

}

export default BookingForm