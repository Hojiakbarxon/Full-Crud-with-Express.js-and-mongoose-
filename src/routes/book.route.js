import { Router } from "express";
import controller from "../controllers/book.controller.js"
import { validator } from "../middlewares/middleware.js";
import bookValid from '../validation/book.validator.js'
let router = Router()

export default router
    .post("/", validator(bookValid.create), controller.create)
    .get("/", controller.findAll)
    .get("/:id", controller.findById)
    .patch("/:id", validator(bookValid.update), controller.update)
    .delete("/:id", controller.delete)