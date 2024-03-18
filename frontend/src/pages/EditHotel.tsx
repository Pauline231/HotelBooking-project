import { useParams } from "react-router-dom"
import ManageHotel from "../forms/ManageHotel/ManageHotel"
import { useMutation, useQuery } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../context/AppContext"

const EditHotel = ()=>{
    const {id :hotelId} =  useParams()
    const {showToast} = useAppContext()
    const {data: hotel} = useQuery("fetchMySingleHotel",
    ()=>apiClient.fetchMySingleHotel(hotelId||""),
    {
        enabled:!!hotelId
    })
    const {mutate, isLoading} = useMutation("updateHotel", apiClient.updateHotel,{
        onSuccess: ()=>{
            showToast({message: "Hotel updated!", type:"SUCCESS"})
        },
        onError:()=>{
            showToast({message: "Failed to Update Hotel", type: "ERROR"})
        }
    })
    const handleSave = (hotelFormData : FormData)=>{
        mutate(hotelFormData)
    }
    
    return (
        <ManageHotel hotel={hotel} onSave={handleSave} isLoading={isLoading} />
    )
}

export default EditHotel