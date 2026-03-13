# 🔒 Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ Yes     |

---

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email the maintainer at: **[maintainer@example.com]**
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will acknowledge your report within **48 hours** and provide a fix timeline.

---

## Security Best Practices

### File Upload Safety

- Validate file type before processing (allow only JPG, PNG, WEBP)
- Limit file upload size (default: 10 MB)
- Sanitize filenames to prevent path traversal attacks
- Store uploads in an isolated directory with restricted permissions
- Delete temporary files after processing

### API Security

- Enable CORS with specific allowed origins (avoid `*` in production)
- Rate-limit the `/generate` endpoint to prevent abuse
- Use HTTPS in production
- Validate and sanitize all request inputs
- Set appropriate response headers (`X-Content-Type-Options`, `X-Frame-Options`)

### Server Security

- Run the application as a non-root user
- Keep dependencies updated (`pip audit`)
- Use environment variables for sensitive configuration (never hardcode secrets)
- Disable debug mode in production (`DEBUG=false`)
- Log security-relevant events

### Model Security

- Verify model file integrity (checksum validation)
- Do not accept user-supplied ONNX models
- Monitor inference resource usage to prevent DoS

---

## Dependencies

Regularly audit dependencies for known vulnerabilities:

```bash
pip install pip-audit
pip-audit
```

---

## Related Documentation

* [ENVIRONMENT.md](ENVIRONMENT.md) — Environment configuration
* [DEPLOYMENT.md](DEPLOYMENT.md) — Production deployment guide
