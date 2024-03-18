import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import SignOut from "./SignOut"


const Header = () =>{
    const {isLoggedIn} = useAppContext()
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
            <span className="text-3xl font-palanquin text-white font-bold tracking-tight">
                <Link to={"/"}>@KTMHolidays</Link>
            </span>
            <span className="flex space-x-2">
                {isLoggedIn?
                <>
                <Link className="flex items-center text-white font-montserrat p-2 rounded-md hover:underline mx-2" to='/my-bookings'>My Bookings</Link>
                <Link className="flex items-center text-white font-montserrat p-2 rounded-md hover:underline mx-2" to='/myhotels'>My Hotels</Link>
                <SignOut/>
                </>:
                <Link to={"/sign-in"} className="flex font-montserrat rounded-xl items-center px-3 text-white font-bold hover:bg-gray-100 hover:text-violet-700">
                Sign in
                </Link>
                }
            
            </span>
            </div>
        </div>

    )
}

export default Header