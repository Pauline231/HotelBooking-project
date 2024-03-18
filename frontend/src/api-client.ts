import { RegisterFormData } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn";
import { BookingType, HotelSearchResponse, HotelType, UserType } from '../../Backend/src/shared/types'

const API_BASE_URL = 'http://localhost:4000'

export const register = async(formData: RegisterFormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/register`,{
        method : "POST",
        credentials :'include',
        headers :{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json();
    if(!response.ok){
        throw new Error(responseBody.message)
    }
}

export const signIn = async(formData: SignInFormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method: 'POST',
        credentials: "include",
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(formData)
    })
    const body = await response.json();
    if(!response.ok){
        throw new Error(body.message)
    }
    return body
}

export const validateToken = async() =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials : "include"
    })
    if(!response.ok){
        throw new Error("Token invalid")
    }
    return response.json()
}

export const signOut = async() =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials: 'include',
        method : 'POST'
    })
    if(!response.ok){
        throw new Error("Error during sign out.")
    }
}

export const addMyHotel = async(hotelFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/hotel/create`,{
        method : "POST",
        credentials: "include",
        body : hotelFormData,
    })
    if(!response.ok){
        throw new Error("Failed to add hotel.")
    }
    return response.json();
}

export const fetchMyHotel = async():Promise<HotelType[]> =>{
    const response = await fetch(`${API_BASE_URL}/api/hotel/myhotel`,{
        credentials: "include"
    })
    if(!response.ok){
        throw new Error("Error fetching hotels.")
    }
    return response.json();
}

export const fetchMySingleHotel = async(hotelId : string):Promise<HotelType> =>{
    const response = await fetch(`${API_BASE_URL}/api/hotel/myhotel/${hotelId}`,{
        credentials: "include"
    })
    if (!response.ok){
        throw new Error("Error fetching the hotel.")
    }
    return response.json()
}

export const updateHotel = async(hotelFormData : FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/hotel/myhotel/${hotelFormData.get("hotelId")}`,{
        credentials: "include",
        method: "PUT",
        body: hotelFormData
    });
    if(!response.ok){
        throw new Error ("Failed to update Hotel.")
    }
    return response.json()
}

export type SearchParams = {
    destination?: string,
    checkIn?: string,
    checkOut? : string,
    adultCount? : string,
    childCount?: string,
    page?: string,
    facilities?: string[],
    types?: string[],
    stars?:string[],
    maxPrice?:string,
    sortOption?: string
}

export const searchHotels = async(searchParams : SearchParams): Promise<HotelSearchResponse>=>{
    const queryParams = new URLSearchParams();
    queryParams.append('destination', searchParams.destination || "");
    queryParams.append('checkIn', searchParams.checkIn||"");
    queryParams.append('checkOut', searchParams.checkOut||"");
    queryParams.append('adultCount', searchParams.adultCount||"");
    queryParams.append('childCount', searchParams.childCount||"");
    queryParams.append('page', searchParams.page||"");
    queryParams.append('maxPrice', searchParams.maxPrice||'');
    queryParams.append('sortOption', searchParams.sortOption||"");

    searchParams.facilities?.map((facility)=>
        queryParams.append("facilities",facility)
    )

    searchParams.types?.forEach((type)=>queryParams.append("types",type));
    searchParams.stars?.forEach((star)=>queryParams.append("stars",star));

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)
    if(!response.ok){
        throw new Error("Error fetching the search result.")
    }
    return response.json()
}

export const fetchHotelDetail = async(id : string): Promise<HotelType>=>{
    const response = await fetch(`${API_BASE_URL}/api/hotel/${id}`,{
        credentials: "include",
    })
    if(!response.ok){
        throw new Error ("Error fetching hotel detail")
    }
    return response.json()
}

export const fetchUser = async(): Promise<UserType> =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/getUser`,{
        credentials: "include"
    })    
    if(!response.ok){
        throw new Error ("Error fetching User details.")
    }
    return response.json()
}

export type BookingDataType={
    firstName? : string,
    lastName?: string,
    email?: string,
    adultCount?: number,
    childCount?: number,
    checkIn?: Date,
    checkOut?: Date,
    totalCost?: number,
    hotelId :string
}

export const createBooking = async(bookingData : BookingDataType):Promise<BookingType>=>{
    const response = await fetch(`${API_BASE_URL}/api/bookings/create-booking/${bookingData.hotelId}`,{
        method: "POST",
        credentials: "include",
        body: JSON.stringify(bookingData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(!response.ok){
        throw new Error ("Failed to create Booking")
    }
    return response.json()
}

export const fetchMyBookings = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/bookings/`,{
        method : "GET",
        credentials: "include"
    })
    if(!response.ok){
        throw new Error ("Error while fetching your bookings")
    }
    return response.json()
}

export const fetchAllHotels = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/hotel`,{
        method : "GET",
        credentials: "include"
    })
    if(!response.ok){
        throw new Error ("Error while fetching the hotels")
    }
    return response.json()
}