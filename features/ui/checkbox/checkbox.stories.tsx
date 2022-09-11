import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Checkbox } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = () => <Checkbox />;

export const Default = Template.bind({});
Default.args = {};
