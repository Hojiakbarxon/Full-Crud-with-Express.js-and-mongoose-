import { catchAsync } from "../middlewares/catch-async.js";
import { BaseController } from "./base.controller.js";
import User from "../schemas/users-schama.js"
import crypto from "../crypto/crypto.js"
import { Roles } from "../enums/index.js";
import { successRes } from "../utils/successRes.js";

class MangerController extends BaseController {
    create = catchAsync(async (req, res) => {
        let { phoneNumber, email, userName, password } = req.body
        await this._isExist({ phoneNumber }, "Phone number ")
        await this._isExist({ email }, "Email ")
        await this._isExist({ userName }, "User name ")

        let hashedPassword = await crypto.decode(password)
        delete req.body?.password

        let newManager = await User.create({
            hashedPassword,
            role: Roles.MANAGER,
            ...req.body
        })

        return successRes(res, newManager, 201)
    })


    update = catchAsync(async (req, res) => {
        let id = req.params.id
        await this._getById(id)
        
        let { phoneNumber, email, userName, password } = req.body
        if (phoneNumber) {
            await this._isExistInUpdate({ phoneNumber }, id, `Phone number `)
        }

        if (email) {
            await this._isExistInUpdate({ email }, id, "Email ")
        }

        if (userName) {
            await this._isExistInUpdate({ userName }, id, `User name `)
        }
        let hashedPassword
        if (password) {
            hashedPassword = await crypto.decode(password)
        } else {
            hashedPassword = await User.findById(id).hashedPassword
        }

        delete req.body?.password

        let result = {
            hashedPassword,
            role: Roles.MANAGER,
            ...req.body
        }

        let updatedManager = await User.findByIdAndUpdate(id, result, { new: true })

        return successRes(res, updatedManager)
    })

}

export default new MangerController(User)