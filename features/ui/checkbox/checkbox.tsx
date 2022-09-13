import { color, space } from "@styles/theme";
import styled, { StyledFunction } from "styled-components";

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

const Box = styled.input<{
  checkboxSize: CheckboxSize;
}>`
  /* Hide the native checkbox */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;

  /* Add custom checkbox styling */
  background-color: ${color("primary", 50)};
  padding: 0;
  height: ${(props) =>
    props.checkboxSize === CheckboxSize.sm ? space(4) : space(5)};
  width: ${(props) =>
    props.checkboxSize === CheckboxSize.sm ? space(4) : space(5)};
  border: 1px solid ${color("primary", 600)};
  border-radius: 6px;
`;

const Checkmark = styled.svg<{
  checkboxSize: CheckboxSize;
}>`
  position: absolute;

  /* Left spacing will always equal ((Checkbox Width - Checkmark Width) / 2) to center the checkmark */
  left: ${(props) =>
    props.checkboxSize === CheckboxSize.sm ? space(1) : space(1)};
  width: ${(props) =>
    props.checkboxSize === CheckboxSize.sm ? space(2) : space(3)};
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
    <Label htmlFor={name}>
      <Box
        // Cannot simply use the name 'size' otherwise there's a clash with existing generic HTMLInput props
        checkboxSize={size}
        type="checkbox"
        name={name}
        id={name}
        disabled={disabled}
        checked={checkboxState === CheckboxState.checked ? true : false}
      />
      <Checkmark
        checkboxSize={size}
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
  );
}
