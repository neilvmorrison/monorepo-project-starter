import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xsmall", "small", "medium", "large", "xlarge"],
    },
    shape: {
      control: { type: "select" },
      options: ["circle", "square"],
    },
    backgroundColor: {
      control: { type: "color" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/300",
    alt: "Avatar image",
    size: "medium",
    shape: "circle",
  },
};

export const WithInitials: Story = {
  args: {
    initials: "JD",
    size: "medium",
    shape: "circle",
  },
};

export const WithCustomColor: Story = {
  args: {
    initials: "JD",
    backgroundColor: "#FF6B3D",
    size: "medium",
    shape: "circle",
  },
};

export const Square: Story = {
  args: {
    initials: "JD",
    size: "medium",
    shape: "square",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar size="xsmall" initials="XS" />
      <Avatar size="small" initials="SM" />
      <Avatar size="medium" initials="MD" />
      <Avatar size="large" initials="LG" />
      <Avatar size="xlarge" initials="XL" />
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    initials: "JD",
    size: "medium",
    shape: "circle",
    onClick: () => alert("Avatar clicked!"),
  },
};
