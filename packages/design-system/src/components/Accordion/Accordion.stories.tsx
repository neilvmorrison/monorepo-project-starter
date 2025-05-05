import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <Accordion>
        <AccordionItem id="default-1" title="Section 1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
            dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
          </p>
        </AccordionItem>
        <AccordionItem id="default-2" title="Section 2">
          <p>
            Ut sit amet gravida tellus. Phasellus non eros sit amet sem commodo
            lacinia. Sed non mauris vitae erat consequat auctor.
          </p>
        </AccordionItem>
        <AccordionItem id="default-3" title="Section 3">
          <p>
            Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit
            amet, ante. Donec eu libero sit amet quam egestas semper.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const MultipleOpen: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <Accordion allowMultiple defaultExpandedItems={["item-1", "item-3"]}>
        <AccordionItem id="item-1" title="Section 1">
          <p>This section is expanded by default.</p>
        </AccordionItem>
        <AccordionItem id="item-2" title="Section 2">
          <p>This section is collapsed by default.</p>
        </AccordionItem>
        <AccordionItem id="item-3" title="Section 3">
          <p>This section is also expanded by default.</p>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <Accordion>
        <AccordionItem id="disabled-1" title="Section 1">
          <p>This section can be expanded.</p>
        </AccordionItem>
        <AccordionItem id="disabled-2" title="Disabled Section" disabled>
          <p>This section is disabled and cannot be expanded.</p>
        </AccordionItem>
        <AccordionItem id="disabled-3" title="Section 3">
          <p>This section can also be expanded.</p>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <Accordion>
        <AccordionItem
          id="rich-1"
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span role="img" aria-label="Star" style={{ marginRight: "8px" }}>
                ⭐
              </span>
              <span>Rich title Content</span>
            </div>
          }
        >
          <div>
            <h4 style={{ marginBottom: "8px" }}>Rich Content Example</h4>
            <p>The accordion can contain any type of content:</p>
            <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
              <li>Lists</li>
              <li>Images</li>
              <li>Form controls</li>
            </ul>
            <button
              style={{
                margin: "8px 0",
                padding: "4px 8px",
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Example Button
            </button>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
