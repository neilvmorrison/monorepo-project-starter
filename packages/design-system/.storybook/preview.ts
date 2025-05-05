import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import "../src/index.css";

// Function to get the current theme based on system preference
const getCurrentTheme = () => {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? themes.dark
    : themes.light;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Disable Storybook's default background controls
    backgrounds: {
      disable: true,
    },
    // Properly configure docs theme with an actual theme object
    docs: {
      theme: getCurrentTheme(),
    },
  },
  // Add theme selector to toolbar for stories
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "system",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "system", icon: "circlehollow", title: "System" },
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
      },
    },
  },
  // Add decorator to apply theme
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;

      // Handle theme selection
      if (theme === "system") {
        // Use system preference (controlled by CSS media query)
        document.body.classList.remove("light", "dark");
      } else {
        // Apply explicit theme
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
      }

      return Story();
    },
  ],
};

export default preview;
