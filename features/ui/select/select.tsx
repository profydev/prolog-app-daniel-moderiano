import { color, theme } from "@styles/theme";
import Select, { Props, StylesConfig } from "react-select";
import "@fontsource/inter";
import styled from "styled-components";
import { ReactNode } from "react";

export type SelectComponentProps = Props & {
  iconSrc?: string | undefined;
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const DropdownIcon = styled.svg`
  padding: 6px 4px;
  margin-right: 14px;
`;

// The default dropdown cannot be styled finely enough to match design specs
const CustomDropdownIndicator = () => (
  <DropdownIcon
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1.5L6 6.5L11 1.5"
      stroke="#667085"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </DropdownIcon>
);

const Icon = styled.img`
  max-width: 15px;
  padding-right: 10px;
`;

// This is used to allow us to include an icon in the placeholder
const CustomPlaceholder = (
  placeholder: ReactNode,
  iconSrc: string | undefined
) => {
  if (iconSrc) {
    return (
      <>
        <Icon src={iconSrc} alt="" />
        {placeholder}
      </>
    );
  } else {
    return placeholder;
  }
};

// Sets the CSS styles for React Select component
const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    maxWidth: "20rem",
    border: `1px solid ${color("gray", 300)({ theme })}`,
    borderRadius: "8px",
    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
  }),

  menu: (provided, state) => ({
    ...provided,
    maxWidth: "20rem",
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    padding: "10px 14px 10px 14px",
  }),

  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none",
  }),

  placeholder: (provided, state) => ({
    ...provided,
    color: `${color("gray", 500)({ theme })}`,
    // Cannot substitute textFont getter here as these are custom JS/CSS properties
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    display: "flex",
    alignContent: "center",
  }),
};

export function SelectComponent({
  iconSrc,
  ...SelectComponentProps
}: SelectComponentProps) {
  return (
    <div>
      <Select
        {...SelectComponentProps}
        placeholder={CustomPlaceholder(
          SelectComponentProps.placeholder,
          iconSrc
        )}
        options={options}
        isSearchable={false}
        styles={customStyles}
        components={{
          DropdownIndicator: CustomDropdownIndicator,
        }}
      />
    </div>
  );
}
