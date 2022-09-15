import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectComponent } from "./select";

export default {
  title: "UI/Select",
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = () => (
  <SelectComponent />
);

export const Default = Template.bind({});
Default.args = {};
