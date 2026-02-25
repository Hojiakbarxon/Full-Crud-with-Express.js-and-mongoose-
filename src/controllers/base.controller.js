import { catchAsync } from "../middlewares/catch-async.js"
import { ApiError } from "../utils/customError.js"
import { successRes } from "../utils/successRes.js"

export class BaseController {
    constructor(model, relation){
        this.model = model
        this.relation = relation
    }
    create = catchAsync(async (req, res) => {
        let newModel = await this.model.create(req.body)
        return successRes(res, newModel, 201)
    })

    findAll = catchAsync(async (req, res) => {
        let datas = await this.model.find().populate(this.relation)
        return successRes(res, datas)
    })

    findById = catchAsync(async (req, res) => {
        let data = await this._getById(req.params.id)
        return successRes(res, data)
    })

    update = catchAsync(async (req, res) => {
        let id = req.params.id
        await this._getById(id)
        let updatedData = await this.model.findByIdAndUpdate(id, req.body, { new: true }).populate(this.relation)
        return successRes(res, updatedData)
    })

    delete = catchAsync(async (req, res) => {
        let id = req.params.id
        await this._getById(id)
        await this.model.findByIdAndDelete(id)
        return successRes(res, {})
    })

    async _getById(id){
        let model = await this.model.findById(id).populate(this.relation)
        if (!model){
            throw new ApiError(`The data with this -> ${id} id is not found`, 404)
        }
        return model
    }

    async _isExist(property, message){
        let existedField = await this.model.findOne(property)
        if (existedField){
            throw new ApiError(`${message} already exists`, 409)
        }
    }
    async _isExistInUpdate(property, id, message){
        let existedField = await this.model.findOne(property)
        if (existedField && existedField.id !== id) {
            throw new ApiError(`${message} already exists`, 409)
        }
    }
}