import Select, { StylesConfig } from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

// Sets the CSS styles for React Select component
const customStyles: StylesConfig = {
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none",
  }),
};

export function SelectComponent() {
  return (
    <Select options={options} isSearchable={false} styles={customStyles} />
  );
}
