import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "UI/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Email",
  placeholder: "olivia@untitledui.com",
  iconSrc: "/icons/mail.svg",
  error: false,
  errorMsg: "This is an error message.",
  hintMsg: "This is a hint text to help user",
  disabled: false,
};
