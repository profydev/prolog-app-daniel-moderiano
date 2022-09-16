import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectComponent } from "./select";

export default {
  title: "UI/Select",
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = (args) => (
  <SelectComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Select team member",
  // iconSrc: "icons/alert.svg",
};
