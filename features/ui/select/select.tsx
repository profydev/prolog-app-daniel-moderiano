import { color, theme } from "@styles/theme";
import Select, { Props, StylesConfig } from "react-select";
import "@fontsource/inter";
import styled from "styled-components";
import { ReactNode } from "react";

export type SelectComponentProps = Props & {
  iconSrc?: string | undefined;
};

const DropdownIcon = styled.svg`
  padding: 6px 4px;
  /* margin-right: 14px; */
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
  /* padding-right: 10px; */
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
    border: state.isFocused
      ? `1px solid ${color("primary", 300)({ theme })}`
      : `1px solid ${color("gray", 300)({ theme })}`,
    borderRadius: "8px",
    boxShadow: state.isFocused
      ? "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF;"
      : "0px 1px 2px rgba(16, 24, 40, 0.05)",
    padding: "10px 14px 10px 14px",
    backgroundColor: state.isDisabled
      ? `${color("gray", 50)({ theme })}`
      : "#FFFFFF",

    "&:hover": {
      borderColor: state.isFocused
        ? `${color("primary", 300)({ theme })}`
        : `${color("gray", 300)({ theme })}`,
      cursor: "pointer",
    },
  }),

  menu: (provided, state) => ({
    ...provided,
    maxWidth: "20rem",
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    margin: "0",
    padding: "0",
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
    margin: "0",
    padding: "0",
  }),

  singleValue: (provided, state) => ({
    ...provided,
    color: `${color("gray", 900)({ theme })}`,
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
        isSearchable={false}
        styles={customStyles}
        components={{
          DropdownIndicator: CustomDropdownIndicator,
        }}
      />
    </div>
  );
}
