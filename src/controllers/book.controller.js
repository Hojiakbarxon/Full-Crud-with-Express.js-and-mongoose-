import Book from "../schemas/book.schema.js"
import { BaseController } from "./base.controller.js"
import { catchAsync } from "../middlewares/catch-async.js"
import { ApiError } from "../utils/customError.js"
import { successRes } from "../utils/successRes.js"
class BookController extends BaseController {
    create = catchAsync(async (req, res) => {
        let { name } = req.body
        let existedBook = await Book.findOne({ name })
        console.log(existedBook)
        if (existedBook) {
            throw new ApiError(`The book name already exists`, 409)
        }
        let newBook = await Book.create(req.body)
        return successRes(res, newBook, 201)
    })

    update = catchAsync(async (req, res) => {
        let id = req.params.id
        await this._getById(id)
        let { name } = req.body
        if (name) {
            let existedBook = await Book.findOne({ name })
            if (existedBook && existedBook.id !== id) {
                throw new ApiError(`The book name already exists`, 409)
            }
        }

        let updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true })
        return successRes(res, updatedBook)
    })
}

export default new BookController(Book, "author")