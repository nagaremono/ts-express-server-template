export class ApiError extends Error {
  constructor(
    public statusCode: number,
    messsage: string,
    public isOperational = true,
    public stack = ''
  ) {
    super(messsage);
    if (!stack) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
