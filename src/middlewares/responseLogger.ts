import morgan from 'morgan';
import { Request, Response } from 'express';
import logger from '../config/logger';

morgan.token('message', (_: Request, res: Response) => res.locals.errorMessage || 'bbb');

const successFormat = `[:date[iso]] :remote-addr - :method :url :status - :response-time ms`;
const errorFormat = `${successFormat} - message: :message`;

export const successResponseLogger = morgan(successFormat, {
  skip: (_, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

export const errorResponseLogger = morgan(errorFormat, {
  skip: (_, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export default [successResponseLogger, errorResponseLogger];
