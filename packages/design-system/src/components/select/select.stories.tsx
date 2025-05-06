import type { Meta, StoryObj } from "@storybook/react";
import Select from "./select";
import React from "react";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outlined"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    error: { control: "text" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Regular text options
const textOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4", disabled: true },
  { value: "option5", label: "Option 5" },
];

// Options with icons
const iconOptions = [
  {
    value: "dashboard",
    label: "Dashboard",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="2"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="2"
          y="9"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="9"
          y="2"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="9"
          y="9"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    value: "settings",
    label: "Settings",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12.8 8.5C12.9311 8.1838 13 7.83951 13 7.48112C13 7.12273 12.9311 6.77844 12.8 6.46224L14.26 5.38261C14.4063 5.27076 14.4525 5.07442 14.37 4.91117L13.37 3.08883C13.2875 2.92558 13.1063 2.85679 12.93 2.92558L11.2 3.58575C10.75 3.23693 10.24 2.96221 9.69 2.77544L9.4 0.89709C9.37187 0.72427 9.22 0.6 9.04 0.6H6.96C6.78 0.6 6.62813 0.72427 6.6 0.89709L6.31 2.77544C5.76 2.96221 5.25 3.23693 4.8 3.58575L3.07 2.92558C2.89375 2.85679 2.7125 2.92558 2.63 3.08883L1.63 4.91117C1.54687 5.07442 1.59375 5.27076 1.74 5.38261L3.2 6.46224C3.06875 6.77844 3 7.12273 3 7.48112C3 7.83951 3.06875 8.1838 3.2 8.5L1.74 9.57963C1.59375 9.69148 1.5475 9.88782 1.63 10.0511L2.63 11.8734C2.7125 12.0367 2.89375 12.1055 3.07 12.0367L4.8 11.3765C5.25 11.7253 5.76 12 6.31 12.1868L6.6 14.0651C6.62813 14.238 6.78 14.3622 6.96 14.3622H9.04C9.22 14.3622 9.37187 14.238 9.4 14.0651L9.69 12.1868C10.24 12 10.75 11.7253 11.2 11.3765L12.93 12.0367C13.1063 12.1055 13.2875 12.0367 13.37 11.8734L14.37 10.0511C14.4525 9.88782 14.4063 9.69148 14.26 9.57963L12.8 8.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    value: "profile",
    label: "Profile",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M3 14C3 11.7909 5.23858 10 8 10C10.7614 10 13 11.7909 13 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    value: "notifications",
    label: "Notifications",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3V1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 15C9.10457 15 10 14.1046 10 13H6C6 14.1046 6.89543 15 8 15Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8V10.5C13 11.3284 13.6716 12 14.5 12H1.5C0.671573 12 0 11.3284 0 10.5V10.5C0 9.67157 0.671573 9 1.5 9H2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    disabled: true,
  },
];

// Rich content options (components with spans, divs, etc.)
const richContentOptions = [
  {
    value: "trending",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "#e74c3c" }}>▲</span>
        <div>
          <div>Trending</div>
          <div style={{ fontSize: "12px", color: "#777" }}>
            Popular right now
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "stable",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "#3498db" }}>◆</span>
        <div>
          <div>Stable</div>
          <div style={{ fontSize: "12px", color: "#777" }}>
            Consistent performance
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "declining",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "#e67e22" }}>▼</span>
        <div>
          <div>Declining</div>
          <div style={{ fontSize: "12px", color: "#777" }}>
            Decreasing popularity
          </div>
        </div>
      </div>
    ),
  },
];

// Basic Select with text options
export const Default: Story = {
  args: {
    options: textOptions,
    placeholder: "Select an option",
  },
};

// Select with a label
export const WithLabel: Story = {
  args: {
    options: textOptions,
    placeholder: "Select an option",
    label: "Favorite Option",
  },
};

// Select with an error
export const WithError: Story = {
  args: {
    options: textOptions,
    placeholder: "Select an option",
    label: "Favorite Option",
    error: "Please select a valid option",
  },
};

// Select with icons
export const WithIcons: Story = {
  args: {
    options: iconOptions,
    placeholder: "Select a section",
  },
};

// Select with rich content
export const RichContent: Story = {
  args: {
    options: richContentOptions,
    placeholder: "Select trend status",
    fullWidth: true,
  },
};

// Outlined variant
export const Outlined: Story = {
  args: {
    options: textOptions,
    placeholder: "Select an option",
    variant: "outlined",
  },
};

// Small size
export const Small: Story = {
  args: {
    options: textOptions,
    placeholder: "Select an option",
    size: "small",
  },
};

// Large size
export const Large: Story = {
  args: {
    options: textOptions,
    placeholder: "Select an option",
    size: "large",
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    options: textOptions,
    placeholder: "Select an option",
    disabled: true,
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    options: textOptions,
    placeholder: "Select an option",
    fullWidth: true,
  },
};
