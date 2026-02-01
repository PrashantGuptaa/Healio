# Logging System Documentation

## Overview

The Healio backend uses **Winston** for application logging and **Morgan** for HTTP request logging. This provides comprehensive logging capabilities for debugging, monitoring, and auditing.

## Features

✅ **Multiple Log Levels**: error, warn, info, http, debug
✅ **Colored Console Output**: Easy to read during development
✅ **Daily Rotating Files**: Automatic log rotation by date
✅ **Separate Error Logs**: Dedicated file for errors
✅ **HTTP Request Logging**: All API requests are logged
✅ **Exception & Rejection Handling**: Uncaught errors are captured
✅ **Configurable Retention**: Logs are kept for specified days

## Log Levels

```typescript
error: 0   // Critical errors
warn: 1    // Warning messages
info: 2    // General information
http: 3    // HTTP requests
debug: 4   // Detailed debugging (dev only)
```

## Log Files

All logs are stored in the `backend/logs/` directory:

### 1. **combined-YYYY-MM-DD.log**
- Contains all log levels
- Rotates daily
- Kept for 14 days
- Max size: 20MB per file

### 2. **error-YYYY-MM-DD.log**
- Contains only error logs
- Rotates daily
- Kept for 14 days
- Max size: 20MB per file

### 3. **http-YYYY-MM-DD.log**
- Contains HTTP request logs
- Rotates daily
- Kept for 7 days
- Max size: 20MB per file

### 4. **exceptions.log**
- Uncaught exceptions
- Does not rotate

### 5. **rejections.log**
- Unhandled promise rejections
- Does not rotate

## Usage in Code

### Import the Logger

```typescript
import logger from '../config/logger';
```

### Log Messages

```typescript
// Error logging
logger.error('Database connection failed', { error: err });

// Warning logging
logger.warn('API rate limit approaching');

// Info logging
logger.info('User registered successfully', { userId: user.id });

// HTTP logging (automatic via Morgan)
// No need to log manually

// Debug logging (development only)
logger.debug('Processing request', { data: requestData });
```

### Log with Context

```typescript
logger.info('Food created', { 
  foodName: food.name, 
  category: food.category,
  userId: req.user.id 
});
```

### Log Errors with Stack Trace

```typescript
try {
  // Some operation
} catch (error) {
  logger.error('Operation failed:', error);
  // Stack trace is automatically included
}
```

## HTTP Request Logging

Morgan automatically logs all HTTP requests with the following format:

```
2026-02-01 10:30:45 [http]: POST /api/foods 201 1234 - 45 ms 127.0.0.1
```

Format: `METHOD URL STATUS CONTENT-LENGTH - RESPONSE-TIME IP`

## Environment-Based Behavior

### Development
- Log level: `debug` (all logs)
- Console output: Colorized
- All transports active

### Production
- Log level: `info` (info, warn, error, http)
- Console output: Plain text
- Health check endpoint not logged
- Error messages sanitized

## Configuration

Edit `backend/src/config/logger.ts` to customize:

- Log levels
- File rotation settings
- Log retention period
- Log format
- File paths

## Log Rotation Settings

```typescript
{
  datePattern: 'YYYY-MM-DD',  // Daily rotation
  maxSize: '20m',              // Max 20MB per file
  maxFiles: '14d',             // Keep for 14 days
}
```

## Best Practices

### ✅ DO

- Log important business events
- Log errors with context
- Use appropriate log levels
- Include relevant data (user ID, resource ID)
- Log API responses for critical operations

### ❌ DON'T

- Log sensitive data (passwords, tokens, credit cards)
- Log in tight loops (use debug level)
- Log large objects (log IDs instead)
- Use console.log (use logger instead)

## Examples

### User Registration

```typescript
logger.info('User registered', { 
  userId: user.id, 
  email: user.email 
});
```

### Database Operations

```typescript
logger.info('Food created', { 
  foodId: food.id, 
  name: food.name 
});
```

### Error Handling

```typescript
try {
  await someOperation();
} catch (error) {
  logger.error('Operation failed', { 
    operation: 'someOperation',
    error: error.message,
    stack: error.stack 
  });
}
```

### API Requests (Automatic)

```typescript
// Morgan handles this automatically
// 2026-02-01 10:30:45 [http]: GET /api/foods 200 5432 - 23 ms
```

## Viewing Logs

### Development (Console)

Logs are displayed in the terminal with colors:
- 🔴 Red: Errors
- 🟡 Yellow: Warnings
- 🟢 Green: Info
- 🟣 Magenta: HTTP
- 🔵 Blue: Debug

### Production (Files)

```bash
# View all logs
tail -f logs/combined-2026-02-01.log

# View errors only
tail -f logs/error-2026-02-01.log

# View HTTP requests
tail -f logs/http-2026-02-01.log

# Search for specific term
grep "User registered" logs/combined-2026-02-01.log
```

## Monitoring & Analysis

### Real-time Monitoring

```bash
# Watch all logs
tail -f logs/combined-*.log

# Watch errors
tail -f logs/error-*.log
```

### Log Analysis

```bash
# Count errors today
grep "error" logs/error-$(date +%Y-%m-%d).log | wc -l

# Find slow requests (>1000ms)
grep -E "- [0-9]{4,} ms" logs/http-*.log

# Search for specific user activity
grep "userId: 123" logs/combined-*.log
```

## Troubleshooting

### Logs Not Appearing

1. Check if logs directory exists: `mkdir -p backend/logs`
2. Check file permissions
3. Verify logger is imported correctly
4. Check log level configuration

### Disk Space Issues

1. Reduce `maxFiles` retention period
2. Reduce `maxSize` per file
3. Set up log archiving
4. Monitor disk usage regularly

## Integration with Monitoring Tools

The logging system is compatible with:

- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Splunk**
- **Datadog**
- **New Relic**
- **CloudWatch** (AWS)

Export logs in JSON format for easier parsing by these tools.

## Security Considerations

- Never log passwords or tokens
- Sanitize user input before logging
- Rotate logs regularly
- Secure log files (proper permissions)
- Consider encryption for sensitive logs
- Implement log access controls

## Performance Impact

- Minimal overhead in production
- Async file writes (non-blocking)
- Automatic log rotation prevents large files
- Console logging disabled in production (optional)

---

For more information, see:
- [Winston Documentation](https://github.com/winstonjs/winston)
- [Morgan Documentation](https://github.com/expressjs/morgan)
