export class NotFoundError extends Error {
  constructor(message?: string) {

    const defaultMessage = message
      ? message
      : 'The requested resource was not found.';

    super(defaultMessage);
    
    this.name = 'NotFoundError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}
