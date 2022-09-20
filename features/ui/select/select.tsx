import { color, textFont, theme } from "@styles/theme";
import Select, {
  components,
  GroupBase,
  OptionProps,
  PlaceholderProps,
  Props,
  SingleValueProps,
  StylesConfig,
} from "react-select";
import "@fontsource/inter";
import styled from "styled-components";

// These props MUST be declared at module level to allow custom components and styles to access them via selectProps
declare module "react-select/dist/declarations/src/Select" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    label?: string;
    hintMsg?: string;
    error?: boolean;
    errorMsg?: string;
    iconSrc?: string;
  }
}

const DropdownIcon = styled.svg`
  padding: 6px 4px;
`;

const SelectedIcon = styled.svg`
  padding: 4.5px 2px;
`;

const Hint = styled.span`
  ${textFont("sm", "regular")};
  color: ${color("gray", 500)};
`;

const Label = styled.span`
  ${textFont("sm", "medium")};
  color: ${color("gray", 700)};
`;

const Error = styled.span`
  ${textFont("sm", "regular")};
  color: ${color("error", 500)};
`;

const { Option, SingleValue, Placeholder } = components;

const CustomSingleValue = ({ children, ...props }: SingleValueProps) => (
  <SingleValue {...props}>
    {props.selectProps.iconSrc && (
      <Icon src={props.selectProps.iconSrc} alt="" />
    )}
    {children}
  </SingleValue>
);

const CustomOption = ({ children, ...props }: OptionProps) => {
  if (props.isSelected) {
    return (
      <Option {...props}>
        <div>
          {props.selectProps.iconSrc && (
            <Icon src={props.selectProps.iconSrc} alt="" />
          )}
          {children}
        </div>

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
          {props.selectProps.iconSrc && (
            <Icon src={props.selectProps.iconSrc} alt="" />
          )}
          {children}
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

const CustomPlaceholder = ({ children, ...props }: PlaceholderProps) => (
  <Placeholder {...props}>
    {props.selectProps.iconSrc && (
      <Icon src={props.selectProps.iconSrc} alt="" />
    )}
    {children}
  </Placeholder>
);

// Sets the CSS styles for React Select component
const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    maxWidth: "20rem", // consider removing on completion of component
    borderWidth: "1px",
    borderColor: state.selectProps.error
      ? `${color("error", 300)({ theme })}`
      : state.isFocused
      ? `${color("primary", 300)({ theme })}`
      : `${color("gray", 300)({ theme })}`,
    borderRadius: "8px",
    boxShadow: state.isFocused
      ? state.selectProps.error
        ? "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEE4E2"
        : "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF;"
      : "0px 1px 2px rgba(16, 24, 40, 0.05)",
    padding: "10px 14px 10px 14px",
    margin: "6px 0",
    backgroundColor: state.isDisabled
      ? `${color("gray", 50)({ theme })}`
      : "#FFFFFF",

    "&:hover": {
      borderColor: state.selectProps.error
        ? `${color("error", 300)({ theme })}`
        : state.isFocused
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

  menuList: (provided) => ({
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
    backgroundColor:
      state.isFocused || state.isSelected
        ? `${color("primary", 25)({ theme })}`
        : "#FFFFFF",

    "&:hover": {
      backgroundColor: `${color("primary", 25)({ theme })}`,
    },
  }),

  valueContainer: (provided) => ({
    ...provided,
    margin: "0",
    padding: "0",
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),

  placeholder: (provided) => ({
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

  singleValue: (provided) => ({
    ...provided,
    color: `${color("gray", 900)({ theme })}`,
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "1.5rem",
  }),
};

export function SelectComponent({
  label,
  hintMsg,
  errorMsg,
  error,
  iconSrc,
  ...Props
}: Props) {
  return (
    <div>
      {label && <Label id="reactSelectId">{label}</Label>}
      <Select
        {...Props}
        iconSrc={iconSrc}
        error={error}
        isSearchable={false}
        styles={customStyles}
        components={{
          DropdownIndicator: CustomDropdownIndicator,
          Option: CustomOption,
          SingleValue: CustomSingleValue,
          Placeholder: CustomPlaceholder,
        }}
        aria-labelledby="reactSelectId"
      />

      {/* Always prioritise error message over hint message */}
      {error && errorMsg ? (
        <Error>{errorMsg}</Error>
      ) : (
        hintMsg && <Hint>{hintMsg}</Hint>
      )}
    </div>
  );
}
