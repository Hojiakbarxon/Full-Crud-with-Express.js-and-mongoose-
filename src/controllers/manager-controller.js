import { catchAsync } from "../middlewares/catch-async.js";
import { BaseController } from "./base.controller.js";
import User from "../schemas/users-schama.js"
import crypto from "../crypto/crypto.js"
import { Roles } from "../enums/index.js";
import { successRes } from "../utils/successRes.js";
import { ApiError } from "../utils/customError.js";
import { generateOTP } from "../utils/otp-generator.js"
import { sendMail } from "../utils/mail-server.js";
import { getCache, setCache } from "../helpers/cache-control.js";

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

    updatePassword = catchAsync(async (req, res) => {
        let { oldPassword, newPassword } = req.body
        let id = req.params?.id
        let admin = await this._getById(id)

        if (!oldPassword && req.user?.role !== Roles.FOUNDER) {
            throw new ApiError(`Old password is required`, 400)
        }
        if (oldPassword) {
            let isMatch = await crypto.encode(oldPassword, admin.hashedPassword)
            if (!isMatch) {
                throw new ApiError(`Your old password is wrong`, 400)
            }
            if (oldPassword === newPassword) {
                throw new ApiError(`New password should be different from old password`, 400)
            }
        }

        let hashedPassword = await crypto.decode(newPassword)
        let updatedAdmin = await User.findByIdAndUpdate(id, { hashedPassword }, { new: true })

        return successRes(res, updatedAdmin)
    })

    update = catchAsync(async (req, res) => {
        let id = req.params.id
        let admin = await this._getById(id)

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
        let hashedPassword = admin?.hashedPassword

        if (req.user?.role === Roles.FOUNDER) {
            hashedPassword = await crypto.decode(password)
            delete req.body?.password
        }

        let result = {
            hashedPassword,
            role: Roles.MANAGER,
            ...req.body
        }

        let updatedManager = await User.findByIdAndUpdate(id, result, { new: true })

        return successRes(res, updatedManager)
    })

    resetPassword = catchAsync(async (req, res) => {
        let id = req.params?.id
        let admin = await this._getById(id)
        let { email } = req.body
        
        let otp = generateOTP()
        let sms = sendMail(admin?.email, otp)
        setCache(email, otp)
        return successRes(res, {
            admin,
            otp
        })
    })
    confirmOtpForPassword = catchAsync(async (req, res) => {
        let id = req.params?.id
        let admin = await this._getById(id)
        let { email, otp, newPassword } = req.body
        if (!admin) {
            throw new ApiError(`The user with this email address is not in our database`, 400)
        }
        let cacheDate = getCache(email)
        if (!cacheDate || cacheDate != otp) {
            throw new ApiError(`otp is expired or wrong`, 400)
        }
        let hashedPassword = await crypto.decode(newPassword)
        let updatedAdmin = await User.findByIdAndUpdate(id, { hashedPassword }, { new: true })

        return successRes(res, {
            updatedAdmin,
            status: `Passwor has been changed successfully`
        })
    })

}

export default new MangerController(User)