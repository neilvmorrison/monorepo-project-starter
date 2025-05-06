import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "../input/input";
import { Checkbox } from "../checkbox";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: { control: "text" },
    required: { control: "boolean" },
    inline: { control: "boolean" },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
    },
    variant: {
      control: "select",
      options: ["default", "secondary", "success", "error", "warning", "info"],
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Form field label",
  },
};

export const Required: Story = {
  args: {
    children: "Required field",
    required: true,
  },
};

export const Inline: Story = {
  args: {
    children: "Inline label",
    inline: true,
  },
};

export const WithHTMLFor: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Label htmlFor="example-input">Label with htmlFor</Label>
      <Input
        id="example-input"
        type="text"
        placeholder="Input field"
        onChange={() => {}}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Label variant="default">Default label</Label>
      <Label variant="secondary">Secondary label</Label>
      <Label variant="success">Success label</Label>
      <Label variant="error">Error label</Label>
      <Label variant="warning">Warning label</Label>
      <Label variant="info">Info label</Label>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Label size="xs">Extra small label</Label>
      <Label size="sm">Small label</Label>
      <Label size="md">Medium label</Label>
      <Label size="lg">Large label</Label>
      <Label size="xl">Extra large label</Label>
      <Label size="xxl">Extra extra large label</Label>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Label weight="regular">Regular weight</Label>
      <Label weight="medium">Medium weight</Label>
      <Label weight="semibold">Semibold weight</Label>
      <Label weight="bold">Bold weight</Label>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}
    >
      <div>
        <Label htmlFor="name" required>
          Full Name
        </Label>
        <Input id="name" type="text" fullWidth onChange={() => {}} />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" fullWidth onChange={() => {}} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox id="terms" />
        <Label htmlFor="terms" inline style={{ marginLeft: "8px" }}>
          I agree to the terms
        </Label>
      </div>
    </div>
  ),
};
