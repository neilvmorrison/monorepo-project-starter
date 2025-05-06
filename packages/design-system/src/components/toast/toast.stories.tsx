import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastProvider, useToast } from "./toast";
import type { ToastType, ToastPosition } from "./toast";
import { Button } from "../button";
import { Text } from "../text";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single Toast examples
export const Success: Story = {
  args: {
    id: "success-toast",
    message: "Operation completed successfully!",
    type: "success",
  },
};

export const Error: Story = {
  args: {
    id: "error-toast",
    message: "Something went wrong. Please try again.",
    type: "error",
  },
};

export const Warning: Story = {
  args: {
    id: "warning-toast",
    message: "This action cannot be undone.",
    type: "warning",
  },
};

export const Info: Story = {
  args: {
    id: "info-toast",
    message: "Your session will expire in 5 minutes.",
    type: "info",
  },
};

// Toast System Demo
const ToastDemo = () => {
  const { addToast, position, setPosition } = useToast();

  const showToast = (type: ToastType) => {
    const messages = {
      success: "Operation completed successfully!",
      error: "Something went wrong. Please try again.",
      warning: "This action cannot be undone.",
      info: "Your session will expire in 5 minutes.",
    };

    addToast({
      message: messages[type],
      type,
      duration: type === "error" ? undefined : 3000, // Make error toasts persistent
    });
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value as ToastPosition);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <Text as="h1" weight="bold" size="xl">
          Toast Position
        </Text>
        <select value={position} onChange={handlePositionChange}>
          <option value="top-left">Top Left</option>
          <option value="top-center">Top Center</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-center">Bottom Center</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <Button onClick={() => showToast("success")}>Show Success</Button>
        <Button onClick={() => showToast("error")}>Show Error</Button>
        <Button onClick={() => showToast("warning")}>Show Warning</Button>
        <Button onClick={() => showToast("info")}>Show Info</Button>
      </div>

      <div>
        <p>
          <strong>Note:</strong> Error toasts are persistent (need to be
          dismissed manually).
        </p>
        <p>All others automatically dismiss after 3 seconds.</p>
      </div>
    </div>
  );
};

export const ToastSystem: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    id: "toast-system",
    message: "This is a placeholder and not used in the demo",
    type: "info",
  },
  render: () => (
    <ToastProvider>
      <div style={{ padding: "20px" }}>
        <ToastDemo />
      </div>
    </ToastProvider>
  ),
};
