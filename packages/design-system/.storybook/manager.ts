import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

// Detect system preference
const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// Apply theme based on system preference
addons.setConfig({
  theme: prefersDark ? themes.dark : themes.light,
});

// Listen for changes in preference
if (window.matchMedia) {
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  colorSchemeQuery.addEventListener("change", (e) => {
    const newTheme = e.matches ? themes.dark : themes.light;
    addons.setConfig({ theme: newTheme });
  });
}
