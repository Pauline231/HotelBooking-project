import express,{Request, Response} from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDatabase from '../database/database'
import authRoutes from './routes/users'
import hotelRoutes from './routes/hotelroutes'
import searchRoutes from './routes/searchRoutes'
import bookingRoutes from './routes/bookingroutes'

import cookieParser from 'cookie-parser'
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials: true
}))


app.use('/api/auth', authRoutes)
app.use('/api/hotel', hotelRoutes)
app.use('/api/hotels', searchRoutes)
app.use('/api/bookings', bookingRoutes)

app.get('/',async(req : Request, res: Response)=>{
    res.json({
        message : "Hello, thank you for bringing me to life."
    })
})

app.listen(4000,()=>{
    console.log('Server is listening at 4000')
})
//invoking connection to database
connectDatabase()