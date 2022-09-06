class UnValidResultException extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = UnValidResultException;
