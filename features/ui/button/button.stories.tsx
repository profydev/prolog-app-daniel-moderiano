import { Button, ButtonColor, ButtonSize, IconOptions } from "./button";
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "UI/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  if (args.icon === "none") {
    return (
      <Button {...args}>
        <span>Button CTA</span>
      </Button>
    );
  }

  if (args.icon === "only") {
    return (
      <Button {...args}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/alert.svg" alt="alert" />
      </Button>
    );
  }

  return (
    <Button {...args}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/alert.svg" alt="alert" />
      <span>Button CTA</span>
    </Button>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.md,
  color: ButtonColor.primary,
  disabled: false,
  icon: IconOptions.none,
};
