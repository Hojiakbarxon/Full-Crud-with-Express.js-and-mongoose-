import Joi from "joi";

class AuthorValidator {
    create(data) {
        let category = Joi.object({
            fullName: Joi.string().required(),
            birthDate: Joi.number().strict().optional(),
            country: Joi.string().required()
        })

        return category.validate(data)
    }
    update(data) {
        let category = Joi.object({
            fullName: Joi.string().optional(),
            birthDate: Joi.number().strict().optional(),
            country: Joi.string().optional()
        })

        return category.validate(data)
    }
}

export default new AuthorValidator()