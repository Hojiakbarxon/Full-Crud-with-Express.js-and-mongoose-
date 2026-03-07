import { compare, hash } from "bcrypt";
import { ApiError } from "../utils/customError.js";

class Crypto {
    async decode(data) {
        try {
            let hashedData = await hash(data, 7)
            return hashedData
        } catch (error) {
            throw new ApiError(`Something went wrong`, 500)
        }
    }

    async encode(data, hashedData) {
        try {
            let isMatch = await compare(data, hashedData)
            return isMatch
        } catch (error) {
            throw new ApiError(`Something went wrong`, 500)
        }
    }
}

export default new Crypto()