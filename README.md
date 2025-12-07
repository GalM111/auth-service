# Auth Service

Node.js/Express authentication microservice that handles registering users, logging them in, and gating protected routes with JSON Web Tokens (JWT) and role-based middleware.

## Features
- Register users with hashed passwords and unique email enforcement.
- Issue short-lived JWTs on login for stateless authentication.
- Middleware for validating tokens (`authMiddleware`) and checking roles (`roleMiddleware`).
- Example protected route (`GET /api/user`) that returns the decoded user payload.
- MongoDB persistence via Mongoose models.

## Tech Stack
- Node.js + Express 5
- MongoDB with Mongoose
- JWT (`jsonwebtoken`)
- Password hashing with `bcryptjs`
- Request validation via `express-validator`
- Environment configuration through `dotenv`

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Set up environment variables**  
   Create a `.env` file (already gitignored) with:
   ```ini
   PORT=5000               # optional, defaults to 5000
   DB_URI=mongodb://localhost:27017/authDB
   JWT_SECRET=super_secret # required for JWT signing/verification
   ```
3. **Run MongoDB**  
   Make sure a Mongo instance is running that matches `DB_URI`.
4. **Start the server**
   ```bash
   node server.js
   ```
   The API defaults to `http://localhost:5000`.

## Folder Structure
```
auth-service/
├── middlewares/        # authMiddleware and roleMiddleware helpers
├── models/             # User schema
├── routes/             # Auth and protected route handlers
├── server.js           # Express bootstrap & Mongo connection
├── package.json
└── .env (local)        # Environment configuration
```

## API Reference

All routes are prefixed with `/api`.

| Method | Endpoint      | Description | Middleware |
| ------ | ------------- | ----------- | ---------- |
| POST   | `/register`   | Register a user (`username`, `email`, `password`). Validates email and password length. | – |
| POST   | `/login`      | Authenticate a user. Returns `{ token, email, message }`. | – |
| GET    | `/user`       | Sample protected route returning the decoded user payload. | `authMiddleware` |

Tokens are expected on protected routes as `Authorization: Bearer <jwt>`.

## Development Notes
- Adjust token expiry or payload in `routes/authRoutes.js`.
- Extend `roleMiddleware` to protect admin routes by passing `roleMiddleware('admin')` to a route definition.
- Consider adding `npm scripts` (e.g., `start`, `dev`) if you prefer not to call `node server.js` directly.

## Testing
Formal automated tests are not defined yet (`npm test` is a placeholder). Use a REST client (Insomnia, Postman, Thunder Client) to exercise the endpoints manually until test coverage is added.
