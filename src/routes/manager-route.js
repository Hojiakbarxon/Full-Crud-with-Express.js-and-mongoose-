import { Router } from "express";
import managerController from "../controllers/manager-controller.js";
import { validator } from "../middlewares/middleware.js"
import managerValidator from "../validation/manager-validator.js";
import authController from "../controllers/auth-controller.js";
let router = Router()

export default router
    .post("/", validator(managerValidator.create), managerController.create)
    .get("/", managerController.findAll)
    .get("/:id", managerController.findById)
    .delete("/:id", managerController.delete)
    .patch("/:id", validator(managerValidator.update), managerController.update)
    .post("/signin", validator(managerValidator.sigin), authController.signin)