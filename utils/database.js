import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set("strictQuery", true) // throws error if you try to query a field that doesn't exist in the schema

    if(isConnected) {
        console.log("MongoDB is already connected")
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
        })

        isConnected = true
        console.log("MongoDB connected")
    } catch(error) {
        console.log("Error connecting to MongoDB")
        console.log(error)
    }
}