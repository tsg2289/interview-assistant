# Security Policy

## SOC 2 Compliance Features

This application implements several security best practices aligned with SOC 2 requirements:

### 1. Data Protection
- **Encryption in Transit**: All data transmitted over HTTPS
- **Environment Variable Protection**: API keys stored securely in environment variables
- **No Persistent Storage**: No user data or research results stored on servers without explicit consent
- **Input Sanitization**: All user inputs are validated and sanitized before processing

### 2. Access Control
- **API Key Security**: OpenAI API keys are never exposed to the client
- **Rate Limiting**: API endpoints are rate-limited to prevent abuse (5 requests per minute per IP)
- **Server-Side Processing**: All AI requests processed server-side through Next.js API routes

### 3. Security Headers
The following security headers are implemented:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### 4. Audit & Monitoring
- Error logging for API failures
- Rate limit tracking
- Request validation and sanitization

### 5. Data Handling
- Local storage used only for checklist state (client-side)
- No PII collection or storage
- Research results can be exported but are not stored server-side
- Users have full control over their data

## Reporting Security Issues

If you discover a security vulnerability, please email security@yourcompany.com. Do not create a public GitHub issue.

## Best Practices for Deployment

1. **Environment Variables**
   - Never commit `.env.local` or `.env.production` files
   - Use Vercel's environment variable management
   - Rotate API keys regularly

2. **API Key Management**
   - Keep OpenAI API keys secure
   - Use separate keys for development and production
   - Monitor API usage for unusual activity

3. **Updates**
   - Keep dependencies up to date
   - Regularly check for security updates: `npm audit`
   - Review and update security policies quarterly

4. **Access Control**
   - Limit access to Vercel dashboard
   - Use strong passwords and 2FA
   - Review team access regularly

## Compliance Checklist

- [x] HTTPS enforced
- [x] API keys secured in environment variables
- [x] Input validation and sanitization
- [x] Rate limiting implemented
- [x] Security headers configured
- [x] No sensitive data logging
- [x] Client-side storage encrypted (browser native)
- [x] Error handling without exposing internals
- [x] Regular dependency updates

## Security Contact

For security concerns, contact: security@yourcompany.com

