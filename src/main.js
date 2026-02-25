import express from "express"
import { connectDb } from "./config/db.js"
import router from "./routes/index.route.js"
import { errorHandle } from "./middlewares/error-handle.js"
import { createFounder } from "./helpers/create-founder.js"
import { envConfig } from "./config/index.js"

let port = envConfig.PORT
let app = express()

app.use(express.json())

connectDb()

await createFounder()

app.use("/api", router)
app.use(errorHandle)
app.listen(port, () => console.log(`Server is running on port `, port))