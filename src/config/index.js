import { config } from "dotenv";
config()

export let envConfig = {
    PORT: Number(process.env.PORT),
    MONGO_URI: String(process.env.MONGO_URI),
    FOUNDER: {
        USERNAME: String(process.env.FOUNDER_USERNAME),
        PASSWORD: String(process.env.FOUNDER_PASSWORD)
    }
}