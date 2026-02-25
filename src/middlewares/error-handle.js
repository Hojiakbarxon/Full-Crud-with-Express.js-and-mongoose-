export function errorHandle(err, _req, res, _next) {
    console.log(`Danggg `, err)
    let statusCode = err?.statusCode || 500
    let message = err?.message || `Internal server error`

    return res.status(statusCode).json({
        statusCode,
        message
    })
}