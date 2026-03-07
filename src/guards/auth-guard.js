import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/customError.js";
import Token from "../utils/tokens.js"
export let authGuard = catchAsync(async (req, res, next) => {
    let auth = req.headers?.authorization
    if (!auth){
        throw new ApiError(`User did not sign in `, 401)
    }
    let bearer = auth.split(" ")[0]
    let accessToken = auth.split(" ")[1]

    if (bearer !== "Bearer" || !accessToken){
        throw new ApiError("User did not sign in", 401)
    }

    let data = Token.verifyAccess(accessToken)
    console.log(data)

    if (!data){
        throw new ApiError(`User did not sign in`, 401)
    }
    req.user = data
    next()
})