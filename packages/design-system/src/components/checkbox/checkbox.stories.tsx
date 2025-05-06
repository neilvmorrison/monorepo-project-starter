import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    hideLabel: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default checkbox",
  },
};

export const Checked: Story = {
  args: {
    label: "Checked checkbox",
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Indeterminate checkbox",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled checked checkbox",
    disabled: true,
    checked: true,
  },
};

export const Small: Story = {
  args: {
    label: "Small checkbox",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium checkbox",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    label: "Large checkbox",
    size: "large",
  },
};

export const WithoutLabel: Story = {
  args: {
    hideLabel: true,
    "aria-label": "Checkbox without visible label",
  },
};

export const WithOnChange: Story = {
  args: {
    label: "Controlled checkbox with onChange handler",
  },
  parameters: {
    docs: {
      description: {
        story: "This checkbox demonstrates how to use onChange to track state",
      },
    },
  },
  render: function Render(args) {
    const [isChecked, setIsChecked] = React.useState(false);
    return (
      <Checkbox
        {...args}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    );
  },
};
