import authorRouter from "./author.route.js";
import bookRouter from "./book.route.js"
import { Router } from "express";
import managerRoute from "./manager-route.js";

let router = Router()

export default router
    .use("/author", authorRouter)
    .use("/book", bookRouter)
    .use("/user", managerRoute)