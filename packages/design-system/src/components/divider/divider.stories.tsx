import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./divider";
import type { DividerProps } from "./divider";

const meta: Meta<DividerProps> = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    size: {
      control: { type: "select" },
      options: ["thin", "regular", "thick"],
    },
  },
  decorators: [
    (Story, context) => {
      // Add styling for better visualization based on orientation
      const style =
        context.args.orientation === "vertical"
          ? { height: "100px", display: "flex", alignItems: "center" }
          : { width: "100%" };

      return (
        <div style={style}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    size: "regular",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    size: "regular",
  },
};

export const Thin: Story = {
  args: {
    size: "thin",
  },
};

export const Regular: Story = {
  args: {
    size: "regular",
  },
};

export const Thick: Story = {
  args: {
    size: "thick",
  },
};

export const HorizontalWithContent: Story = {
  render: () => (
    <div>
      <div>Content above divider</div>
      <Divider />
      <div>Content below divider</div>
    </div>
  ),
};

export const VerticalWithContent: Story = {
  render: () => (
    <div style={{ display: "flex", height: "100px", alignItems: "center" }}>
      <div>Left content</div>
      <Divider orientation="vertical" />
      <div>Right content</div>
    </div>
  ),
};
