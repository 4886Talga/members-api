class ErrorResponse extends Error {
    constructor(message, stausCode) {
        super(message);
        this.statusCode = stausCode;
    }
}

module.exports = ErrorResponse;