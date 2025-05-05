import type { Meta, StoryObj } from "@storybook/react";
import Surface from "./surface";

const meta: Meta<typeof Surface> = {
  title: "Components/Surface",
  component: Surface,
  tags: ["autodocs"],
  args: {
    children: "This is a surface component",
    style: { padding: "1rem" },
  },
};

export default meta;
type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
};

export const HighContrast: Story = {
  args: {
    highContrast: true,
  },
};

export const Card: Story = {
  args: {
    variant: "elevated",
    style: {
      padding: "1.5rem",
      maxWidth: "300px",
    },
    children: (
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Card Title</h3>
        <p>
          This is a card component built using the Surface component as a
          foundation.
        </p>
      </div>
    ),
  },
};

export const AccordionContent: Story = {
  args: {
    variant: "outlined",
    radius: "small",
    style: {
      padding: "1rem",
      marginTop: "-1px",
    },
    children: (
      <p>
        This surface can be used as accordion content. The negative margin
        aligns it with the accordion header.
      </p>
    ),
  },
};

// Showcase different radius options
export const BorderRadius: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Surface variant="elevated" radius="none" style={{ padding: "1rem" }}>
        Radius: none
      </Surface>
      <Surface variant="elevated" radius="small" style={{ padding: "1rem" }}>
        Radius: small
      </Surface>
      <Surface variant="elevated" radius="medium" style={{ padding: "1rem" }}>
        Radius: medium (default)
      </Surface>
      <Surface variant="elevated" radius="large" style={{ padding: "1rem" }}>
        Radius: large
      </Surface>
    </div>
  ),
};

// Showcase different elevation options
export const Elevation: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Surface variant="elevated" elevation="none" style={{ padding: "1rem" }}>
        Elevation: none
      </Surface>
      <Surface variant="elevated" elevation="low" style={{ padding: "1rem" }}>
        Elevation: low
      </Surface>
      <Surface
        variant="elevated"
        elevation="medium"
        style={{ padding: "1rem" }}
      >
        Elevation: medium
      </Surface>
      <Surface variant="elevated" elevation="high" style={{ padding: "1rem" }}>
        Elevation: high
      </Surface>
    </div>
  ),
};
