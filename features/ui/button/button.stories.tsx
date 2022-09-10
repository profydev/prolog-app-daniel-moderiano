import { Button, ButtonColor, ButtonSize } from "./button";
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "UI/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button CTA</Button>
);

export const Default = Template.bind({});

Default.args = {
  size: ButtonSize.md,
  color: ButtonColor.primary,
  disabled: false,
};
