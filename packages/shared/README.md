# Shared

A package containing shared utilities, types, constants, and error definitions used across the monorepo project.

## Features

- TypeScript type definitions shared between packages
- Common utility functions
- Error classes and handling
- Constants used across the application

## Structure

- `types/` - TypeScript interfaces, types, and type definitions
  - `database/` - Database entity types and interfaces
  - `shared.ts` - Common shared types
- `constants/` - Application constants
- `errors/` - Error classes and error handling utilities
- `utils/` - Shared utility functions

## Usage

Import shared resources in other packages:

```typescript
// Import types
import { UserProfile, CurrentUser } from "shared/types";

// Import constants
import { APP_NAME } from "shared/constants";

// Import errors
import { DatabaseError, ValidationError } from "shared/errors";

// Import utilities
import { formatDate } from "shared/utils";
```

## Benefits

- Ensures type consistency across the backend and frontend
- Prevents duplication of code and types
- Makes it easier to maintain and update shared logic
- Improves development experience with better type checking
