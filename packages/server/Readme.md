# Server

A Koa-based RESTful API server that powers the backend of the monorepo project.

## Features

- Koa.js for lightweight and efficient server framework
- PostgreSQL database integration
- JWT-based authentication system
- User management (registration, login, profiles)
- Middleware for error handling, logging, and authentication
- TypeScript for type safety and better developer experience

## Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Then edit .env with your database credentials and JWT secrets
```

## Database Setup

This server requires a PostgreSQL database. Make sure you have PostgreSQL installed and running, then:

1. Create a database for the project
2. Set the database connection details in your `.env` file
3. Run migrations (to be implemented)

## Development

```bash
# Start development server with nodemon for auto-reloading
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get access token
- `POST /api/auth/logout` - Logout (invalidate tokens)
- `GET /api/auth/current` - Get current logged-in user information

### Users

- `GET /api/user_profiles/:id` - Get user profile by ID
- `PATCH /api/user_profiles/:id` - Update user profile

## Resource Generation

The server includes a script to generate new REST resources:

```bash
# Generate a new resource (creates service, routes, and tests)
pnpm generate:resource <resource-name>
```

## Further Resources

- [Koa Documentation](https://koajs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JSON Web Tokens](https://jwt.io/introduction)
