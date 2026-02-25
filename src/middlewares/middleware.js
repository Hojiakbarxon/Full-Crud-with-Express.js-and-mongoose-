import { ApiError } from "../utils/customError.js"

export function validator(schema) {
    return function (req, res, next) {
        let obj = schema(req.body)
        let { error } = obj

        if (error) {
            next(new ApiError(error.details[0]?.message, 422))
        }

        next()
    }
}