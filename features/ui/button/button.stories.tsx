import { Button, ButtonColor, ButtonSize, IconOptions } from "./button";
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "UI/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.md,
  color: ButtonColor.primary,
  disabled: false,
  icon: IconOptions.leading,
  iconSrc: "/icons/test-icon.svg",
  text: "Button CTA",
};
