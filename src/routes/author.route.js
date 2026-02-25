import { Router } from "express";
import controller from "../controllers/author.controller.js"
import { validator } from "../middlewares/middleware.js";
import authValid from '../validation/author.validator.js'
let router = Router()

export default router
    .post("/", validator(authValid.create), controller.create)
    .get("/", controller.findAll)
    .get("/:id", controller.findById)
    .patch("/:id", validator(authValid.update), controller.update)
    .delete("/:id", controller.delete)