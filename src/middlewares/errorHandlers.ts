import { ErrorRequestHandler, RequestHandler } from 'express';
import { ApiError } from '../utils/ApiError';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import CONFIG from '../config/config';
import logger from '../config/logger';

export const notFoundHandler: RequestHandler = (_, __, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
};

export const errorConverter: ErrorRequestHandler = (err, _, __, next) => {
  if (err instanceof ApiError === false) {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

    next(new ApiError(statusCode, message, false, err.stack));
  }
  next(err);
};

export const errorHandler: ErrorRequestHandler = (err: ApiError, _, res, __) => {
  if (CONFIG.NODE_ENV === 'development') {
    logger.error(err);
  }
  let { statusCode, message } = err;
  if (CONFIG.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = ReasonPhrases.INTERNAL_SERVER_ERROR;
  }

  res.locals.errorMessage = err.message;

  res.status(statusCode).send({
    statusCode,
    message,
    ...(CONFIG.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default [notFoundHandler, errorConverter, errorHandler];
