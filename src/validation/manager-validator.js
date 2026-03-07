import Joi from "joi";

class ManagerValidator {
    create(data) {
        let manager = Joi.object({
            fullName: Joi.string().required(),
            phoneNumber: Joi.string().optional(),
            email: Joi.string().optional(),
            userName: Joi.string().required(),
            password: Joi.string().required(),
            gender: Joi.string().valid("MALE", "FEMALE").required()
        })

        return manager.validate(data)
    }

    update(data) {
        let manager = Joi.object({
            fullName: Joi.string().optional(),
            phoneNumber: Joi.string().optional(),
            email: Joi.string().optional(),
            userName: Joi.string().optional(),
            password: Joi.string().optional(),
            gender: Joi.string().valid("MALE", "FEMALE").optional()
        })

        return manager.validate(data)
    }
    updatePassword(data) {
        let manager = Joi.object({
            oldPassword: Joi.string().optional(),
            newPassword: Joi.string().required()
        })

        return manager.validate(data)
    }

    signin(data) {
        let user = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        return user.validate(data)
    }
    otp(data) {
        let user = Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().required()
        })

        return user.validate(data)
    }
    resetPassword(data) {
        let user = Joi.object({
            email: Joi.string().email().required()
        })
        return user.validate(data)
    }
    confirmOtpForPassword(data) {
        let user = Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().required(),
            newPassword : Joi.string().required()
        })

        return user.validate(data)
    }
}

export default new ManagerValidator()