import mongoose from 'mongoose'

const connectDatabase = async()=>{
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log("database connected successfully")
}

export default connectDatabase