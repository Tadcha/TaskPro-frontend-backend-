# 🛡️ TaskPro API Rate Limiting

## Overview

TaskPro API implements rate limiting to ensure fair usage and protect against abuse.

## Rate Limits

### General API Endpoints

- **Limit**: 100 requests per 15 minutes per IP
- **Applies to**: All `/api/*` routes
- **Headers**: `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`

### Authentication Endpoints

- **Limit**: 5 requests per 15 minutes per IP
- **Applies to**:
  - `POST /api/users/login`
  - `POST /api/users/register`
- **Headers**: `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`

## Error Response

When rate limit is exceeded:

```json
{
  "error": "🚫 Too many requests from this IP",
  "message": "Please try again after 15 minutes",
  "retryAfter": "15 minutes"
}
```

## Status Codes

- `429 Too Many Requests` - Rate limit exceeded

## Best Practices for Frontend

1. **Handle 429 responses** gracefully
2. **Show user-friendly messages** when rate limited
3. **Implement exponential backoff** for retries
4. **Cache responses** when possible to reduce API calls
5. **Use the rate limit headers** to track usage

## Headers to Monitor

```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1696598400
```

## Development vs Production

- **Development**: More lenient rate limiting
- **Production**: Strict enforcement for security
