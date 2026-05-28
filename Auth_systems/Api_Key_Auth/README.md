# API Key Authentication Task

A simple Express.js server demonstrating API Key Authentication and permission-based authorization.

# Reflection Questions

## How is API key authentication different from Basic Auth?

Basic Authentication uses a username and password combination encoded with Base64. API key authentication uses a single generated token that identifies an application or service instead of a specific user.

---

## Why is API key authentication usually a poor choice for user-facing applications?

API keys are static and can be easily leaked from frontend applications or browsers. They also do not support user sessions, logout functionality, or advanced security mechanisms.

---

## What strategies can be used to keep API keys safe and to revoke them when leaked?

- Store keys in environment variables
- Never expose keys in frontend code
- Use HTTPS
- Rotate keys regularly
- Revoke compromised keys
- Limit permissions
- Use expiration dates
