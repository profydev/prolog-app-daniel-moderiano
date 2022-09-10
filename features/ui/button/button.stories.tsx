import { Button, ButtonColor, ButtonSize, IconOptions } from "./button";
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "UI/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>
    {args.icon !== "none" && (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/test-icon.svg" alt="circle" />
    )}
  </Button>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.md,
  color: ButtonColor.primary,
  disabled: false,
  icon: IconOptions.none,
  label: "Button CTA",
};
