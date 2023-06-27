class InvalidAuth extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.stack = null;
  }
}

module.exports = InvalidAuth;
