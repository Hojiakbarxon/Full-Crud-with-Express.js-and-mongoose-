import Joi from "joi"

class BookValidator {
    create(data) {
        let book = Joi.object({
            name: Joi.string().required(),
            year: Joi.number().strict().required(),
            author: Joi.string().hex().length(24).required()
        })

        return book.validate(data)
    }
    update(data) {
        let book = Joi.object({
            name: Joi.string().optional(),
            year: Joi.number().strict().optional(),
            author: Joi.string().hex().length(24).optional()
        })

        return book.validate(data)
    }
}

export default new BookValidator()