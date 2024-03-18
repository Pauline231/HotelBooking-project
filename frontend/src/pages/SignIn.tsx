import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from '../api-client'
import { useAppContext } from "../context/AppContext";

export type SignInFormData = {
    email : string;
    password :string;
}

const SignIn = ()=>{
    const queryClient = useQueryClient()
    const {showToast} = useAppContext()
    const navigate = useNavigate()
    const {register, formState:{errors}, handleSubmit} = useForm<SignInFormData>()
    const mutation = useMutation(apiClient.signIn,{
        onSuccess: async()=>{
            showToast({message : "Log in successfull", type:"SUCCESS"})
            await queryClient.invalidateQueries('validatetoken')
            navigate('/')
            //1. show toast message
            //2. navigate to home page
        },onError: (error : Error)=>{
            showToast({message :error.message,type:"ERROR"})
            //show the error
        }
    })
    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data)
    })

    return(
        <form onSubmit={onSubmit} className="flex flex-col px-20 gap-5">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <label className="text-gray-700 text-sm font-bold  font-montserrat flex-1">Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register("email",{required: "This field is required"})}></input>
                {errors.email && (<span className="text-red-500">{errors.email.message}</span>)}
                </label>
                <label className="text-gray-700 text-sm font-bold  font-montserrat flex-1">Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("password",{
                         required: "This field is required",
                         minLength:{
                            value :8,
                            message : "Password must be at least 8 characters"
                            }})}></input>
                {errors.password && (<span className="text-red-500">{errors.password.message}</span>)}
                </label>
                <span className="flex items-start flex-col  gap-2">
                    <button type="submit" className="bg-blue-800 text-white rounded-md p-2 hover:bg-green-600  ">Log In</button>
                    <span onClick={()=>navigate('/register')} className="text-sm text-blue-500 underline hover:text-green-600 hover:cursor-pointer">Don't have an account? Register here</span>
                </span>
                
        </form>
    )
}

export default SignIn