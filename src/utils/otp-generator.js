import { generate } from "otp-generator";

export function generateOTP() {
    let otp = generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })

    return otp
}