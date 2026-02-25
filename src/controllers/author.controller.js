import { catchAsync } from '../middlewares/catch-async.js'
import Author from '../schemas/author.schema.js'
import { ApiError } from '../utils/customError.js'
import { successRes } from '../utils/successRes.js'
import { BaseController } from './base.controller.js'

class AuthorController extends BaseController {
    create = catchAsync(async (req, res) => {
        let existedAuthor = await Author.findOne({ name: req.body?.fullName })
        console.log(existedAuthor)
        if (existedAuthor) {
            throw new ApiError(`The author name already exists`, 409)
        }
        let newAuthor = await Author.create(req.body)
        return successRes(res, newAuthor, 201)
    })

    update = catchAsync(async (req, res) => {
        let id = req.params.id
        await this._getById(id)
        let { fullName } = req.body
        if (fullName) {
            let existedAuthor = await Author.findOne({ fullName })
            if (existedAuthor && existedAuthor.id !== id) {
                throw new ApiError(`The author name already exists`, 409)
            }
        }

        let updatedAuthor = await Author.findByIdAndUpdate(id, req.body, { new: true })
        return successRes(res, updatedAuthor)
    })
}

export default new AuthorController(Author, 'books')