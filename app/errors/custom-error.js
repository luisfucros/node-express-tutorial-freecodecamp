class CustomAPIError extends Error {
    constructor(message) {
      super(message)
    }
  }
  
class NotFoundError extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statusCode = 404
    }
  }
  
  module.exports = { NotFoundError, CustomAPIError }
  