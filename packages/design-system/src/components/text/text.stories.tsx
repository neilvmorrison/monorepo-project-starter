import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./index";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "span",
        "div",
        "label",
      ],
      defaultValue: "p",
    },
    variant: {
      control: "select",
      options: ["default", "secondary", "success", "error", "warning", "info"],
      defaultValue: "default",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      defaultValue: "md",
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
      defaultValue: "regular",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      defaultValue: "left",
    },
    truncate: { control: "boolean", defaultValue: false },
    nowrap: { control: "boolean", defaultValue: false },
    uppercase: { control: "boolean", defaultValue: false },
    capitalize: { control: "boolean", defaultValue: false },
    italic: { control: "boolean", defaultValue: false },
    underline: { control: "boolean", defaultValue: false },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "This is default text",
  },
};

export const Heading: Story = {
  args: {
    as: "h1",
    size: "xxl",
    weight: "bold",
    children: "This is a heading",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "This is success text",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "This is error text",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "This is warning text",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "This is info text",
  },
};

export const Truncated: Story = {
  args: {
    truncate: true,
    children:
      "This is a very long text that should be truncated with ellipsis when it exceeds the container width, demonstrating the truncate property in action.",
    style: { width: "200px" },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text variant="default">Default text</Text>
      <Text variant="secondary">Secondary text</Text>
      <Text variant="success">Success text</Text>
      <Text variant="error">Error text</Text>
      <Text variant="warning">Warning text</Text>
      <Text variant="info">Info text</Text>
    </div>
  ),
};
