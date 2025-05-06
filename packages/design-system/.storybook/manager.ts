import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

// Detect system preference and set initial theme
const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

document.documentElement.classList.toggle("dark-theme", prefersDark);

// Listen for changes in preference
if (window.matchMedia) {
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  colorSchemeQuery.addEventListener("change", (e) => {
    // Update Storybook theme
    const newTheme = e.matches ? themes.dark : themes.light;
    addons.setConfig({ theme: newTheme });

    // Toggle dark theme class on root element
    document.documentElement.classList.toggle("dark-theme", e.matches);
  });
}
