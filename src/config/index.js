import { config } from "dotenv";
config()

export let envConfig = {
    PORT: Number(process.env.PORT),
    MONGO_URI: String(process.env.MONGO_URI),
    FOUNDER: {
        USERNAME: String(process.env.FOUNDER_USERNAME),
        PASSWORD: String(process.env.FOUNDER_PASSWORD)
    },
    TOKENS: {
        ACCESS_KEY: String(process.env.ACCESS_TOKEN_KEY),
        ACCESS_TIME: String(process.env.ACCESS_TOKEN_TIME),
        REFRESH_KEY: String(process.env.REFRESH_TOKEN_KEY),
        REFRESH_TIME: String(process.env.REFRESH_TOKEN_TIME)
    }
}