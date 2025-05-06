import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu, DropdownItem, DropdownSeparator } from "./dropdown-menu";
import { Button } from "../button";

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["bottom-start", "bottom-end", "top-start", "top-end"],
    },
    width: {
      control: { type: "radio" },
      options: ["trigger", "auto", 200],
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

// Simple example with text items
export const Basic: Story = {
  args: {
    trigger: <Button>Open Menu</Button>,
    children: (
      <>
        <DropdownItem onClick={() => console.log("Item 1 clicked")}>
          Item 1
        </DropdownItem>
        <DropdownItem onClick={() => console.log("Item 2 clicked")}>
          Item 2
        </DropdownItem>
        <DropdownItem onClick={() => console.log("Item 3 clicked")}>
          Item 3
        </DropdownItem>
      </>
    ),
  },
};

// Example with section separators
export const WithSeparators: Story = {
  args: {
    trigger: <Button>Actions</Button>,
    children: (
      <>
        <DropdownItem onClick={() => console.log("Edit clicked")}>
          Edit
        </DropdownItem>
        <DropdownItem onClick={() => console.log("Duplicate clicked")}>
          Duplicate
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem onClick={() => console.log("Archive clicked")}>
          Archive
        </DropdownItem>
        <DropdownItem onClick={() => console.log("Delete clicked")} disabled>
          Delete
        </DropdownItem>
      </>
    ),
  },
};

// Position variants
export const Positions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <DropdownMenu
        trigger={<Button>Bottom Start</Button>}
        position="bottom-start"
      >
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </DropdownMenu>

      <DropdownMenu trigger={<Button>Bottom End</Button>} position="bottom-end">
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </DropdownMenu>

      <DropdownMenu trigger={<Button>Top Start</Button>} position="top-start">
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </DropdownMenu>

      <DropdownMenu trigger={<Button>Top End</Button>} position="top-end">
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </DropdownMenu>
    </div>
  ),
};

// Rich content example
export const RichContent: Story = {
  args: {
    trigger: <Button variant="secondary">User Settings</Button>,
    children: (
      <>
        <div style={{ padding: "0.5rem 1rem", fontWeight: "bold" }}>
          User Account
        </div>
        <DropdownItem
          icon={
            <span role="img" aria-label="profile">
              👤
            </span>
          }
          onClick={() => console.log("Profile clicked")}
        >
          Profile Settings
        </DropdownItem>
        <DropdownItem
          icon={
            <span role="img" aria-label="preferences">
              ⚙️
            </span>
          }
          onClick={() => console.log("Preferences clicked")}
        >
          Preferences
        </DropdownItem>
        <DropdownSeparator />
        <div
          style={{
            padding: "0.5rem 1rem",
            fontSize: "var(--font-size-xs)",
            color: "var(--text-secondary)",
          }}
        >
          SECURITY
        </div>
        <DropdownItem
          icon={
            <span role="img" aria-label="password">
              🔑
            </span>
          }
          onClick={() => console.log("Password clicked")}
        >
          Change Password
        </DropdownItem>
        <DropdownItem
          icon={
            <span role="img" aria-label="devices">
              📱
            </span>
          }
          onClick={() => console.log("Devices clicked")}
        >
          Authorized Devices
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem
          icon={
            <span role="img" aria-label="logout">
              🚪
            </span>
          }
          onClick={() => console.log("Logout clicked")}
        >
          Logout
        </DropdownItem>
      </>
    ),
    width: 220,
  },
};

// Controlled state example
export const Controlled: Story = {
  render: function Controlled() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            size="small"
          >
            {isOpen ? "Close Menu" : "Open Menu"}
          </Button>
        </div>

        <DropdownMenu
          trigger={<Button>Controlled Menu</Button>}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <DropdownItem onClick={() => setIsOpen(false)}>Option 1</DropdownItem>
          <DropdownItem onClick={() => setIsOpen(false)}>Option 2</DropdownItem>
          <DropdownItem onClick={() => setIsOpen(false)}>Option 3</DropdownItem>
        </DropdownMenu>
      </div>
    );
  },
};
