# 🔥 PNPM Monorepo Starter

A TypeScript monorepo using PNPM workspaces with four main packages:

- A Koa backend with JWT auth
- A React (vite) frontend
- A component library
- Shared types/utilities

## Motivation

**NOTE: The intent for this project is to be used to develop proof-of-concept applications**, _not_ to be production ready out of the box.

I hate setting up projects. I want to avoid all the boilerplate setup that usually derails motivation to go tackle an idea when you have a couple of spare hours.

### What this project does:

- Provide A web-client already configured with login/registration flows and private/public routes so you can get started as soon as you've connected to your database. You can also rip them out, up to you.
- Provide a RESTful API with a postgres pool connection, already configured with `auth` and `public` schema, including tables for `users` and `user_profiles`, respectively.
- Provide a design-system that is not dependent on any other design framework (i.e., Material or Shadcn/ui). Design systems change all the time and are usually pretty heavy for what they offer. This implementation exclusively with css modules for styling, theming and animations, augmented with `react-spring` for motion.
- Share types between `web-client` and `server` to encourage data integrity. **Note: this process is manual for now, I'll be implementing some form of codegen eventually**.

### What this project does not do:

- **Handle deployments and/or connect to cloud services**. There are too many variables to make an out-of-the-box deployment solution practical for most cases. This project is a BYO Infrastructure.
- **Send Emails**. Same reasoning as above.
- **Leverage an ORM**. ORMs are highly polarizing and in most cases I'd argue they're unnecessary for any reason outside of ergonomics. You can always add one if you want to, but the `server` contains a basic Database-interaction layer that covers the most common interactions.
- **Implement OAuth/Magic Link etc.**. The auth-service included in this project is basic and intended to be used to satisfy auth requirements for development purposes. The `AuthService` class is built as a black-box, intended to be replaced by whichever provider you prefer.

## Package Documentation

- [Web Client](./packages/web-client/README.md) - React-based frontend application
- [Server](./packages/server/Readme.md) - Koa-based RESTful API server
- [Design System](./packages/design-system/README.md) - Component library with Storybook
- [Shared](./packages/shared/README.md) - Shared types, utilities, and constants

## Stack

### Package Management

- [PNPM](https://pnpm.io/documentation) - Fast, disk-efficient package manager with workspaces support

### Frontend

- [React 19](https://react.dev/) - Component-based UI library
- [React Router 7](https://reactrouter.com/en/main) - Declarative routing for React applications
- [TanStack Query (React Query)](https://tanstack.com/query/latest/docs/react/overview) - Data fetching and state management
- [Tailwind CSS 4](https://tailwindcss.com/docs/installation) - Utility-first CSS framework
- [Vite 6](https://vitejs.dev/guide/) - Next-generation frontend tooling

### Backend

- [Koa 2](https://koajs.com/) - Lightweight web framework for Node.js
- [PostgreSQL](https://www.postgresql.org/docs/) - Powerful, open-source relational database
- [JSON Web Tokens](https://jwt.io/introduction) - Secure method for authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing library

### Design System

- [Storybook 8](https://storybook.js.org/docs/get-started/install) - UI component development environment
- [React Spring](https://www.react-spring.dev/docs/getting-started) - Spring-physics based animation library

### Testing

- [Jest](https://jestjs.io/docs/getting-started) - JavaScript testing framework
- [Vitest](https://vitest.dev/guide/) - Next-generation testing framework
- [Playwright](https://playwright.dev/docs/intro) - Reliable end-to-end testing

### TypeScript

- [TypeScript 5](https://www.typescriptlang.org/docs/) - Static type-checking JavaScript superset

### Development Tools

- [ESLint 9](https://eslint.org/docs/latest/) - Code quality and style checker
- [Nodemon](https://github.com/remy/nodemon#nodemon) - Auto-restarting Node.js applications during development
