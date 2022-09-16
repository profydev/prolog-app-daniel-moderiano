import { color, theme } from "@styles/theme";
import Select, { Props, StylesConfig } from "react-select";
import "@fontsource/inter";

export type SelectComponentProps = Props & {
  iconSrc?: string;
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const CustomDropdownIndicator = () => (
  <svg
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
  </svg>
);

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
        placeholder="Select team member"
        options={options}
        isSearchable={false}
        styles={customStyles}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
    </div>
  );
}
