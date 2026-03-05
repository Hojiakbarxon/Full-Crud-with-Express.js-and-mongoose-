import crypto from "../crypto/crypto.js"
import { catchAsync } from "../middlewares/catch-async.js"
import User from "../schemas/users-schama.js"
import { ApiError } from "../utils/customError.js"
import { successRes } from "../utils/successRes.js"
import Token from "../utils/tokens.js"
import { sendMail } from "../utils/mail-server.js"
import { generateOTP } from "../utils/otp-generator.js"
import { getCache, setCache } from "../helpers/cache-control.js"
class AuthController {
    signin = catchAsync(async (req, res) => {
        let { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            res.clearCookie("refreshToken")
            throw new ApiError(`Email or password is wrong`, 400)
        }
        let isMatch = await crypto.encode(password, user?.hashedPassword)
        if (!isMatch) {
            res.clearCookie("refreshToken")
            throw new ApiError(`Email or password is wrong`, 400)
        }

        
        let otp = generateOTP()
        let sms = await sendMail(user?.email, `Your one-time-password is ${otp} do not give it to someone else`)
        console.log(sms)

        setCache(email, otp)

        return successRes(res, {
            user,
            otp
        })

    })
    getAccessToken = catchAsync(async (req, res) => {
        let refreshToken = req.cookies?.refreshToken
        if (!refreshToken) {
            throw new ApiError(`Please signin firstly`, 401)
        }

        let data = Token.verifyRefresh(refreshToken)
        if (!data) {
            throw new ApiError(`Something went wrong, signin again`, 401)
        }

        let user = await User.findById(data?.id)
        if (!user) {
            throw new ApiError(`Your data is not found`, 400)
        }

        let payload = { id: user._id, fullName: user.fullName, role: user.role, isActive: user.isActive }

        let accessToken = Token.getAccessToken(payload)

        return successRes(res, {
            token: accessToken
        })
    })

    confirmOTP = catchAsync(async (req, res) => {
        let { email, otp } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            throw new ApiError(`Something went wrong`, 400)
        }

        let cacheDate = getCache(email)
        if (!cacheDate || cacheDate !== otp) {
            throw new ApiError(`otp is expired or incorrect`, 400)
        }

        let payload = { id: user._id, fullName: user.fullName, role: user.role, isActive: user.isActive }
        let accessToken = Token.getAccessToken(payload)
        let refreshToken = Token.getRefreshToken(payload, res)

        return successRes(res, {
            user,
            accessToken,
            refreshToken
        })

    })

    signOut = catchAsync(async (req, res) => {
        let refreshToken = req.cookies?.refreshToken
        if (refreshToken) {
            res.clearCookie("refreshToken")
        }
        return successRes(res, {})
    })
    
}

export default new AuthController()