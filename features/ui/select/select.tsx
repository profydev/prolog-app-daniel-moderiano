import { color, theme } from "@styles/theme";
import Select, {
  components,
  OptionProps,
  Props,
  StylesConfig,
} from "react-select";
import "@fontsource/inter";
import styled from "styled-components";
import { ReactNode, useEffect } from "react";

export type SelectComponentProps = Props & {
  iconSrc?: string | undefined;
};

const DropdownIcon = styled.svg`
  padding: 6px 4px;
  /* margin-right: 14px; */
`;

const SelectedIcon = styled.svg`
  padding: 4.5px 2px;
`;

interface dataType {
  value: string;
  label: string;
  iconSrc?: string;
}

function isValidOptionData(object: unknown): object is dataType {
  if (!object || typeof object !== "object") {
    return false;
  }

  if ("value" in object && "label" in object) {
    return true;
  }

  return false;
}

const { Option } = components;

const CustomOption = (props: OptionProps) => {
  if (!isValidOptionData(props.data)) {
    return null;
  }

  if (props.isSelected) {
    return (
      <Option {...props}>
        <div>
          {props.data.iconSrc && <Icon src={props.data.iconSrc} alt="" />}
          <span>{props.label}</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <SelectedIcon
          width="16"
          height="11"
          viewBox="0 0 16 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.6668 1L5.50016 10.1667L1.3335 6"
            stroke="#7F56D9"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SelectedIcon>
      </Option>
    );
  } else {
    return (
      <Option {...props}>
        <div>
          {props.data.iconSrc && <Icon src={props.data.iconSrc} alt="" />}
          <span>{props.label}</span>
        </div>
      </Option>
    );
  }
};

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
    maxWidth: "20rem", // consider removing on completion of component
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
    maxWidth: "20rem", // consider removing on completion of component
    boxShadow:
      "0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    margin: "0.5rem 0",
    maxHeight: "20rem", // consider adjusting or removing this
  }),

  menuList: (provided, state) => ({
    ...provided,
    maxHeight: "20rem", // consider adjusting or removing this
  }),

  option: (provided, state) => ({
    ...provided,
    margin: "0",
    color: `${color("gray", 900)({ theme })}`,
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
    paddingLeft: "0",
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
  // Add the iconSrc to each option to avoid having to manually add it to the options array prop
  useEffect(() => {
    if (SelectComponentProps.options && iconSrc) {
      SelectComponentProps.options.forEach((option) => {
        if (isValidOptionData(option)) {
          option.iconSrc = iconSrc;
        }
      });
    }
  }, [SelectComponentProps.options, iconSrc]);

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
          Option: CustomOption,
        }}
      />
    </div>
  );
}
