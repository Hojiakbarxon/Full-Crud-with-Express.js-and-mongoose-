import { Router } from "express";
import managerController from "../controllers/manager-controller.js";
import { validator } from "../middlewares/middleware.js"
import managerValidator from "../validation/manager-validator.js";
import authController from "../controllers/auth-controller.js";
import { authGuard } from "../guards/auth-guard.js";
import { roleGuard } from "../guards/role-guard.js";
import { Roles } from "../enums/index.js";
let router = Router()

export default router
    .post("/", authGuard, roleGuard(Roles.FOUNDER), validator(managerValidator.create), managerController.create)
    .get("/", authGuard, roleGuard(Roles.FOUNDER), managerController.findAll)
    .get("/:id", authGuard, roleGuard(Roles.FOUNDER, "ID"), managerController.findById)
    .delete("/:id", managerController.delete)
    .patch("/:id", authGuard, roleGuard(Roles.FOUNDER, "ID"), validator(managerValidator.update), managerController.update)
    .patch("/password/:id", authGuard, roleGuard(Roles.FOUNDER, "ID"), validator(managerValidator.updatePassword), managerController.updatePassword)
    .patch("/reset/:id", authGuard, roleGuard(Roles.FOUNDER, "ID"), validator(managerValidator.resetPassword), managerController.resetPassword)
    .patch("/otppas/:id", authGuard, roleGuard(Roles.FOUNDER, "ID"), validator(managerValidator.confirmOtpForPassword), managerController.confirmOtpForPassword)
    .post("/signin", validator(managerValidator.signin), authController.signin)
    .post("/otp", validator(managerValidator.otp), authController.confirmOTP)
    .post("/token", authController.getAccessToken)
    .post("/signout", authController.signOut)