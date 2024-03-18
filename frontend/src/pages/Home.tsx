import { useQuery } from "react-query"
import * as apiClient from '../api-client'
import LatestDestinationCard from "../components/LatestDestinationCard";
import { HotelType } from "../../../Backend/src/shared/types";



const Home = ()=>{
    const {data:hotels} = useQuery("fetchHotels",apiClient.fetchAllHotels,{
        onError: ()=>{}
    })
    const topRowHotels = hotels?.slice(0, 2) || [];
    const bottomRowHotels = hotels?.slice(2) || [];
    
    return (
        <div className="space-y-3">
      <h2 className="text-3xl font-montserrat font-bold">Latest Destinations</h2>
      <p className="font-palanquin text-xl">Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel:HotelType) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel: HotelType) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home