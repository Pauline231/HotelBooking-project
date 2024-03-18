import { useMutation, useQueryClient } from "react-query"
import { useAppContext } from "../context/AppContext"
import * as apiClients from '../api-client'
import { useNavigate } from "react-router-dom"

const SignOut = ()=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const {showToast} = useAppContext()
    const mutation = useMutation(apiClients.signOut,{
        onSuccess: async()=>{
            await queryClient.invalidateQueries("validatetoken")
            showToast({message: "Signed out successfully", type: "SUCCESS"})
            navigate('/')
        }, onError:(error: Error)=>{
            showToast({message:error.message, type: "ERROR"});
            }})  
    const handleClick = ()=>{
        mutation.mutate()
    }
    return(
        <button onClick={()=>handleClick()} className="p-2 bg-white ml-2 font-montserrat font-bold text-blue-500 rounded-md hover:bg-green-500 hover:text-white">
            Log Out
        </button>
    )
}
export default SignOut