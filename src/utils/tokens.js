import jwt from "jsonwebtoken"
import { envConfig } from "../config/index.js"

class Token {
    getAccessToken(payload) {
        let accessToken = jwt.sign(payload, envConfig.TOKENS.ACCESS_KEY, {
            expiresIn: envConfig.TOKENS.ACCESS_TIME
        })
        return accessToken
    }

    getRefreshToken(payload, res) {
        let refreshToken = jwt.sign(payload, envConfig.TOKENS.REFRESH_KEY, {
            expiresIn: envConfig.TOKENS.REFRESH_TIME
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        return refreshToken
    }
    verifyAccess(token) {
        let isMatch = jwt.verify(token, envConfig.TOKENS.ACCESS_KEY)
        return isMatch
    }
    verifyRefresh(token) {
        let isMatch = jwt.verify(token, envConfig.TOKENS.REFRESH_KEY)

        return isMatch
    }
}

export default new Token()