# PNPM Monorepo Project Starter

A modern TypeScript-based monorepo using PNPM workspaces with a complete web application stack.

## Project Structure

This project is organized as a monorepo using PNPM workspaces, containing the following packages:

```
packages/
├── backend/     # Koa-based REST API server
├── frontend/    # React-based web application
└── shared/      # Shared types, utilities, and error definitions
```

## Packages

### Backend

A RESTful API built with:

- Koa.js for the web server
- PostgreSQL for the database
- JWT for authentication
- TypeScript for type safety
- Jest for testing

### Frontend

A modern web application built with:

- React 19
- TailwindCSS
- React Router
- React Query
- TypeScript

### Shared

Contains code shared between frontend and backend:

- Common TypeScript types
- Shared utilities
- Error definitions

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- PNPM package manager
- PostgreSQL (for the backend)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Start all packages in development mode:

```bash
pnpm dev
```

Or start individual packages:

```bash
pnpm dev:frontend  # Start the frontend
pnpm dev:backend   # Start the backend
```

### Building

Build all packages:

```bash
pnpm build
```

### Adding Dependencies

Add dependencies to specific packages:

```bash
pnpm backend:add <package-name>  # Add to backend
pnpm frontend:add <package-name> # Add to frontend
```

## Backend Development

The backend includes a resource generator script:

```bash
pnpm backend:generate-resource
```

## License

This project is licensed under the MIT License.
