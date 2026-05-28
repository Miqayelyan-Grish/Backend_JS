
## Why is Base64 not considered a security measure?

Base64 is only an encoding mechanism, not encryption. Anyone can decode Base64 credentials back into plain text.

---

## What is the purpose of the WWW-Authenticate header?

The `WWW-Authenticate` header tells the client that authentication is required and specifies the authentication method.

---

## In what real-world situations is Basic Auth still acceptable?

- Internal tools
- Development environments
- Small private APIs
- Temporary testing systems
- Services protected with HTTPS