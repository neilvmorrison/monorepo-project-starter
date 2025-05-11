import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "text" },
    },
    height: {
      control: { type: "text" },
    },
    variant: {
      control: { type: "select" },
      options: ["text", "circular", "rectangular", "rounded"],
    },
    animation: {
      control: { type: "select" },
      options: ["pulse", "wave", "none"],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base skeleton example
export const Default: Story = {
  args: {
    width: "100%",
    height: "20px",
    variant: "text",
    animation: "pulse",
  },
};

// Text skeleton examples
export const Text: Story = {
  args: {
    width: "80%",
    variant: "text",
  },
};

// Circular skeleton example (avatar placeholder)
export const Circular: Story = {
  args: {
    width: 40,
    height: 40,
    variant: "circular",
  },
};

// Rectangular skeleton example (image placeholder)
export const Rectangular: Story = {
  args: {
    width: 210,
    height: 118,
    variant: "rectangular",
  },
};

// Rounded skeleton example (card placeholder)
export const Rounded: Story = {
  args: {
    width: "100%",
    height: 120,
    variant: "rounded",
  },
};

// Wave animation example
export const WaveAnimation: Story = {
  args: {
    width: "100%",
    height: 200,
    variant: "rounded",
    animation: "wave",
  },
};

// Multiple text lines example
export const TextLines: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <Skeleton variant="text" height="1.2em" style={{ marginBottom: "8px" }} />
      <Skeleton
        variant="text"
        width="90%"
        height="1.2em"
        style={{ marginBottom: "8px" }}
      />
      <Skeleton
        variant="text"
        width="95%"
        height="1.2em"
        style={{ marginBottom: "8px" }}
      />
      <Skeleton variant="text" width="60%" height="1.2em" />
    </div>
  ),
};

// Card placeholder example
export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Skeleton
        variant="rounded"
        height="200px"
        style={{ marginBottom: "12px" }}
      />
      <Skeleton variant="text" height="1.5em" style={{ marginBottom: "8px" }} />
      <Skeleton
        variant="text"
        width="90%"
        height="1.2em"
        style={{ marginBottom: "8px" }}
      />
      <Skeleton variant="text" width="60%" height="1.2em" />
    </div>
  ),
};

// Avatar with text example
export const AvatarWithText: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
      }}
    >
      <Skeleton variant="circular" width={50} height={50} />
      <div style={{ flex: 1 }}>
        <Skeleton
          variant="text"
          height="1.2em"
          width="70%"
          style={{ marginBottom: "6px" }}
        />
        <Skeleton variant="text" height="1em" width="40%" />
      </div>
    </div>
  ),
};
