import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Checkbox } from "../checkbox/checkbox";

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

export const TextInput: Story = {
  args: {
    variant: "outline",
    placeholder: "Enter text...",
    onChange: () => {},
  },
};

export const FormExample: Story = {
  args: {
    onChange: () => {},
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Input placeholder="Username" onChange={() => {}} />
      <Input type="password" placeholder="Password" onChange={() => {}} />
      <Checkbox label="Remember me" onChange={() => {}} />
    </div>
  ),
};

export const Filled: Story = {
  args: {
    variant: "filled",
    placeholder: "Enter text...",
    onChange: () => {},
  },
};

export const Unstyled: Story = {
  args: {
    variant: "unstyled",
    placeholder: "Enter text...",
    onChange: () => {},
  },
};

export const Small: Story = {
  args: {
    size: "small",
    placeholder: "Small input",
    onChange: () => {},
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    placeholder: "Medium input",
    onChange: () => {},
  },
};

export const Large: Story = {
  args: {
    size: "large",
    placeholder: "Large input",
    onChange: () => {},
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
    onChange: () => {},
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: "Enter text...",
    iconRight: <CheckIcon />,
    onChange: () => {},
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: "Search...",
    iconLeft: <SearchIcon />,
    iconRight: <CheckIcon />,
    onChange: () => {},
  },
};

export const Error: Story = {
  args: {
    placeholder: "Error state",
    isError: true,
    caption: "This field is required",
    onChange: () => {},
  },
};

export const Success: Story = {
  args: {
    placeholder: "Success state",
    isSuccess: true,
    caption: "Username is available",
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    onChange: () => {},
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: "Full width input",
    fullWidth: true,
    onChange: () => {},
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Enter text...",
    defaultValue: "This is a pre-filled value",
    onChange: () => {},
  },
};

export const Password: Story = {
  args: {
    placeholder: "Enter password",
    type: "password",
    onChange: () => {},
  },
};

export const WithWarningCaption: Story = {
  args: {
    placeholder: "Enter text...",
    caption: "This action cannot be undone",
    captionType: "warning",
    onChange: () => {},
  },
};

export const WithInfoCaption: Story = {
  args: {
    placeholder: "Enter email",
    caption: "We'll never share your email with anyone else",
    captionType: "info",
    onChange: () => {},
  },
};
