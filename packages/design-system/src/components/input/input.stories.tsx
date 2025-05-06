import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

// Icons (mock for demonstration)
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outline", "filled", "unstyled"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    isError: { control: "boolean" },
    isSuccess: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {
  args: {
    variant: "outline",
    placeholder: "Enter text...",
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    placeholder: "Enter text...",
  },
};

export const Unstyled: Story = {
  args: {
    variant: "unstyled",
    placeholder: "Enter text...",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    placeholder: "Small input",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    placeholder: "Medium input",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    placeholder: "Large input",
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: "Search...",
    iconLeft: <SearchIcon />,
    type: "search",
    variant: "outline",
    size: "medium",
    "aria-label": "Search",
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: "Enter text...",
    iconRight: <CheckIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: "Search...",
    iconLeft: <SearchIcon />,
    iconRight: <CheckIcon />,
  },
};

export const Error: Story = {
  args: {
    placeholder: "Error state",
    isError: true,
  },
};

export const Success: Story = {
  args: {
    placeholder: "Success state",
    isSuccess: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: "Full width input",
    fullWidth: true,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Enter text...",
    defaultValue: "This is a pre-filled value",
  },
};

export const Password: Story = {
  args: {
    placeholder: "Enter password",
    type: "password",
  },
};
