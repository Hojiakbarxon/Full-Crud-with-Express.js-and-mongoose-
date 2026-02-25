import { compare, hash } from "bcrypt";

class Crypto{
    async decode(data) {
        let hashedData = await hash(data, 7)
        return hashedData
    }

    async encode(data, hashedData) {
        let isMatch = await compare(data,hashedData)
        return isMatch
    }
}

export default new Crypto()