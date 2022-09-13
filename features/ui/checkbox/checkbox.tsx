import { color, space } from "@styles/theme";
import styled from "styled-components";

export enum CheckboxSize {
  sm = "sm",
  md = "md",
}

export enum CheckboxState {
  checked = "checked",
  unchecked = "unchecked",
  indeterminate = "indeterminate",
}

interface CheckboxProps {
  label: string;
  name: string;
  checkboxState: CheckboxState;
  disabled: boolean;
  size: CheckboxSize;
}

const Box = styled.input`
  /* Hide the native checkbox */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;

  /* Add custom checkbox styling */
  background-color: ${color("primary", 50)};
  padding: 0;
  height: ${space(5)};
  width: ${space(5)};
  border: 1px solid ${color("primary", 600)};
  border-radius: 6px;
`;

const Checkmark = styled.svg`
  position: absolute;
  left: ${space(1)};
`;

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
`;

export function Checkbox({
  label,
  name,
  checkboxState = CheckboxState.unchecked,
  disabled = false,
  size = CheckboxSize.md,
}: CheckboxProps) {
  return (
    <div>
      <Label htmlFor={name}>
        <Box
          type="checkbox"
          name={name}
          id={name}
          disabled={disabled}
          checked={checkboxState === CheckboxState.checked ? true : false}
        />
        <Checkmark
          width="12"
          height="9"
          viewBox="0 0 12 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6666 1.5L4.24992 7.91667L1.33325 5"
            stroke="#7F56D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Checkmark>
        <span>{label}</span>
      </Label>
    </div>
  );
}
