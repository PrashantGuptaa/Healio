import morgan from 'morgan';
import { stream } from '../config/logger';

// Define custom token for response time in milliseconds
morgan.token('response-time-ms', (_req, res) => {
  const responseTime = res.getHeader('X-Response-Time');
  return responseTime ? `${responseTime}ms` : '-';
});

// Custom format for Morgan
const morganFormat =
  ':method :url :status :res[content-length] - :response-time ms :remote-addr';

// Create Morgan middleware
const morganMiddleware = morgan(morganFormat, {
  stream,
  skip: (req, _res) => {
    // Skip logging for health check endpoint in production
    if (process.env.NODE_ENV === 'production' && req.url === '/health') {
      return true;
    }
    return false;
  },
});

export default morganMiddleware;
