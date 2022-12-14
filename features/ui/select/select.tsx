import { color, textFont, theme } from "@styles/theme";
import Select, {
  ActionMeta,
  components,
  DropdownIndicatorProps,
  GroupBase,
  OnChangeValue,
  OptionProps,
  PlaceholderProps,
  Props,
  SingleValueProps,
  StylesConfig,
} from "react-select";
import "@fontsource/inter"; // required to pass into react-select component (cannot access otherwise)
import styled from "styled-components";

// Add new props here to cover any required features of the select component. This lets us avoid directly using react-select props across the codebase, thereby avoiding such tight coupling to react-select.
type SelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = {
  label?: string;
  hintMsg?: string;
  hasError?: boolean;
  errorMsg?: string;
  iconSrc?: string;
  disabled?: boolean;
  clearable?: boolean;
  onOptionChange?: (
    newValue: OnChangeValue<Option, IsMulti>,
    actionMeta: ActionMeta<Option>
  ) => void;
};

// use SelectProps to define the react-select props
declare module "react-select/dist/declarations/src/Select" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > extends SelectProps<Option, IsMulti, Group> {}
}

const Icon = styled.img`
  max-width: 0.9375rem;
  padding-right: 0.625rem;
`;

const DownCaret = styled.svg<{
  menuIsOpen: boolean;
}>`
  padding: 0.375rem 0.25rem;
  transform: ${(props) =>
    props.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)"};
`;

const Tick = styled.svg`
  padding: 0.28rem 0.125rem;
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

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SingleValue = ({ children, ...props }: SingleValueProps) => (
  <components.SingleValue {...props}>
    {props.selectProps.iconSrc && (
      <Icon src={props.selectProps.iconSrc} alt="" />
    )}
    {children}
  </components.SingleValue>
);

const Option = ({ children, ...props }: OptionProps) => (
  <components.Option {...props}>
    <LeftContainer>
      {props.selectProps.iconSrc && (
        <Icon src={props.selectProps.iconSrc} alt="" />
      )}
      {children}
    </LeftContainer>

    {props.isSelected && (
      <Tick
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
      </Tick>
    )}
  </components.Option>
);

const DropdownIndicator = ({ ...props }: DropdownIndicatorProps) => (
  <DownCaret
    menuIsOpen={props.selectProps.menuIsOpen}
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
  </DownCaret>
);

const Placeholder = ({ children, ...props }: PlaceholderProps) => (
  <components.Placeholder {...props}>
    {props.selectProps.iconSrc && (
      <Icon src={props.selectProps.iconSrc} alt="" />
    )}
    {children}
  </components.Placeholder>
);

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    borderWidth: "1px",
    borderColor: state.selectProps.hasError
      ? `${color("error", 300)({ theme })}`
      : state.isFocused
      ? `${color("primary", 300)({ theme })}`
      : `${color("gray", 300)({ theme })}`,
    borderRadius: "8px",
    boxShadow: state.isFocused
      ? state.selectProps.hasError
        ? "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEE4E2"
        : "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF;"
      : "0px 1px 2px rgba(16, 24, 40, 0.05)",
    padding: "0.5625rem 0.8125rem",
    margin:
      state.selectProps.label ||
      state.selectProps.errorMsg ||
      state.selectProps.hintMsg
        ? "6px 0"
        : "0",
    backgroundColor: state.isDisabled
      ? `${color("gray", 50)({ theme })}`
      : "#FFFFFF",

    "&:hover": {
      borderColor: state.selectProps.hasError
        ? `${color("error", 300)({ theme })}`
        : state.isFocused
        ? `${color("primary", 300)({ theme })}`
        : `${color("gray", 300)({ theme })}`,
      cursor: "pointer",
    },
  }),

  menu: (provided) => ({
    ...provided,
    boxShadow:
      "0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
    borderRadius: "8px",
    margin: "0.5rem 0",
  }),

  menuList: (provided) => ({
    ...provided,
    maxHeight: "20rem",
  }),

  option: (provided, state) => ({
    ...provided,
    color: `${color("gray", 900)({ theme })}`,
    lineHeight: "1.5rem",
    padding: "0.625rem 0.875rem",
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

  placeholder: (provided) => ({
    ...provided,
    color: `${color("gray", 500)({ theme })}`,
    lineHeight: "1.5rem",
    display: "flex",
    alignContent: "center",
    margin: "0",
  }),

  singleValue: (provided) => ({
    ...provided,
    lineHeight: "1.5rem",
    display: "flex",
    alignContent: "center",
    margin: "0",
  }),

  clearIndicator: (provided) => ({
    ...provided,
    margin: "0",
    padding: "0 0.1rem",
  }),
};

export function SelectComponent({
  label,
  hintMsg,
  errorMsg,
  hasError,
  iconSrc,
  disabled,
  clearable,
  onOptionChange,
  ...Props
}: Props) {
  // Always prioritis error message over hint message
  let message = null;
  if (hasError && errorMsg) {
    message = <Error>{errorMsg}</Error>;
  } else if (hintMsg) {
    message = <Hint>{hintMsg}</Hint>;
  }

  return (
    <div>
      {label && <Label id="reactSelectId">{label}</Label>}
      <Select
        {...Props}
        isDisabled={disabled}
        isClearable={clearable}
        iconSrc={iconSrc}
        onChange={onOptionChange}
        hasError={disabled ? false : hasError}
        isSearchable={false}
        styles={customStyles}
        aria-labelledby="reactSelectId"
        components={{
          DropdownIndicator,
          Option,
          SingleValue,
          Placeholder,
          IndicatorSeparator: null,
        }}
      />
      {message}
    </div>
  );
}
