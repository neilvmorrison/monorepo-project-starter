# Design System

A comprehensive design system for the monorepo project, providing reusable UI components with consistent styling and behavior.

## Features

- Independent component library without external UI dependencies
- Storybook for component development and documentation
- TypeScript for type safety
- CSS Modules for component-scoped styling
- Animation support with React Spring

## Components

The design system includes the following components:

- Button - Various button styles with different variants and sizes
- Text - Typography components for consistent text styling
- Surface - Container components with consistent styling
- Input - Form input components with validation
- Dropdown - Dropdown menus with rich content support
- Toast - Notification system
- Avatar - User avatar components
- And more...

## Development

```bash
# Start Storybook for component development
pnpm storybook

# Build the design system
pnpm build

# Lint the code
pnpm lint
```

## Usage

Import components in your application:

```tsx
import { Button, Text, Avatar } from "design-system";

function MyComponent() {
  return (
    <div>
      <Text as="h1" size="xxl">
        Welcome
      </Text>
      <Button variant="primary" onClick={() => console.log("Clicked")}>
        Click me
      </Button>
    </div>
  );
}
```

## Further Resources

- [Storybook Documentation](https://storybook.js.org/docs/get-started/install)
- [React Spring Documentation](https://www.react-spring.dev/docs/getting-started)
