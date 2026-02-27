import crypto from "../crypto/crypto.js"
import { catchAsync } from "../middlewares/catch-async.js"
import User from "../schemas/users-schama.js"
import { ApiError } from "../utils/customError.js"
import { successRes } from "../utils/successRes.js"
import Token from "../utils/tokens.js"
class AuthController{
    signin = catchAsync(async (req, res) => {
        let {userName, password} = req.body
        let user = await User.findOne({userName})
        if (!user) {
            throw new ApiError(`Username or password is wrong`, 400)
        }
        let isMatch = await crypto.encode(password, user.hashedPassword)
        if (!isMatch) {
            throw new ApiError(`Username or password is wrong`, 400)
        }
        let payload = {id : user._id,fullName : user.fullName ,role : user.role, isActive : user.isActive}

        let accessToken = Token.getAccessToken(payload)
        let refreshToken = Token.getRefreshToken(payload, res)

        return successRes(res, {
            user,
            accessToken,
            refreshToken
        })

    })
}

export default new AuthController()