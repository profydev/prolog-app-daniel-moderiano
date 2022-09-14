import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select } from "./select";

export default {
  title: "UI/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = () => <Select />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  viewMode: "docs",
};
