function createError(errorCode, errorMessage) {
    return { code: errorCode, message: errorMessage}
}

module.exports = createError;