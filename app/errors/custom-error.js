const { StatusCodes } = require('http-status-codes')

class CustomAPIError extends Error {
    constructor(message) {
      super(message)
    }
  }
  
class NotFoundError extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.NOT_FOUND
    }
  }
  
module.exports = { NotFoundError, CustomAPIError }
  