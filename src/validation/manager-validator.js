import Joi from "joi";

class ManagerValidator{
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
}

export default new ManagerValidator()