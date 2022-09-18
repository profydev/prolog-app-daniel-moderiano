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
  options: [
    { value: "Phoenix Baker", label: "Phoenix Baker" },
    { value: "Olivia Rhye", label: "Olivia Rhye" },
    { value: "Lana Steiner", label: "Lana Steiner" },
    { value: "Demi Wilkinson", label: "Demi Wilkinson" },
    { value: "Candice Wu", label: "Candice Wu" },
    { value: "Natali Craig", label: "Natali Craig" },
    { value: "Drew Cano", label: "Drew Cano" },
  ],
  // isDisabled: true,
  menuIsOpen: true,
  iconSrc: "/icons/person.svg",
};
