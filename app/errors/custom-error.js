class CustomAPIError extends Error {
    constructor(message) {
      super(message)
    }
  }
  
class CustomError extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statusCode = 404
    }
  }
  
  module.exports = { CustomError, CustomAPIError }
  