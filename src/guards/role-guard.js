import { catchAsync } from "../middlewares/catch-async.js"
import { ApiError } from "../utils/customError.js"

export let roleGuard = (...roles) => {
    return catchAsync(async (req, _res, next) => {
        if (roles.includes(req.user?.role) || roles.includes("ID")){
            if (req.user?.id === req.params?.id){
                return next()
            }
        }
        if (!roles.includes(req.user?.role)){
            throw new ApiError(`Forbidden user`, 403)
        }
        next()
    })
}