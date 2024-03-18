import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import { useAppContext } from "./context/AppContext"
import AddHotel from "./pages/AddHotel"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import SearchPage from "./pages/Search"
import Details from "./pages/Details"
import Booking from "./pages/ Booking"
import MyBookings from "./pages/Mybookings"
import Home from "./pages/Home"

const App = () => {
  const {isLoggedIn} = useAppContext()
  return (
    <BrowserRouter>
    <Routes>

    <Route path="/"
     element={<Layout>
      <Home/>
     </Layout>}/>

     <Route path="/search"
     element={<Layout>
      <p>Searchpage</p>
     </Layout>}/>

      <Route path="/register" 
      element={<Layout>
        <Register/>
      </Layout>}/>

    <Route path="/sign-in" 
    element={<Layout>
      <SignIn/>
    </Layout>}/>

     {isLoggedIn &&
     <>
     <Route path="/addhotel" 
     element={<Layout>
       <AddHotel/>
     </Layout>}/>

    <Route path="/myhotels" 
    element={<Layout>
    <MyHotels/>
    </Layout>}/>

    <Route path="/edit-hotel/:id" 
    element={<Layout>
    <EditHotel/>
    </Layout>}/>

    <Route path="/booking/:id" 
    element={<Layout>
    <Booking/>
    </Layout>}/>

    <Route path="/my-bookings" 
    element={<Layout>
    <MyBookings/>
    </Layout>}/>
    </>
     } 

    <Route path="hotels/search" 
    element={<Layout>
    <SearchPage/>
    </Layout>}/>

    <Route path="hotels/search/:id" 
    element={<Layout>
    <Details/>
    </Layout>}/>


  </Routes>
  </BrowserRouter>
  )

}

export default App