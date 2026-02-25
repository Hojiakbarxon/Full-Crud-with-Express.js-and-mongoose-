export function successRes(res, data, statusCode = 200) {
    return res.status(statusCode).json({
        statusCode,
        data,
        message: `Executed successfully`
    })
}