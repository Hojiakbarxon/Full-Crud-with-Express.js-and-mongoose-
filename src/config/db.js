import mongoose from "mongoose";
import { config } from "dotenv";
config()

let uri = String(process.env.MONGO_URI)
export async function connectDb() {
    try {
        await mongoose.connect(uri)
        console.log(`Connected to the DB`)
    } catch (error) {
        console.log(error)
    }
}