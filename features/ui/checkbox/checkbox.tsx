import { color, space, textFont } from "@styles/theme";
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

const Box = styled.input<{
  checkboxSize: CheckboxSize;
  checkboxState: CheckboxState;
}>`
  /* Hide the native checkbox */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;

  /* Add custom checkbox styling */
  background-color: ${(props) =>
    props.checkboxState === CheckboxState.unchecked
      ? "#FFFFFF"
      : color("primary", 50)};
  padding: 0;
  height: ${(props) =>
    props.checkboxSize === CheckboxSize.sm ? space(4) : space(5)};
  width: ${(props) =>
    props.checkboxSize === CheckboxSize.sm ? space(4) : space(5)};
  border: 1px solid;
  border-color: ${(props) =>
    props.checkboxState === CheckboxState.unchecked
      ? color("gray", 300)
      : color("primary", 600)};
  border-radius: 6px;
`;

const Checkmark = styled.div<{
  checkboxSize: CheckboxSize;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Left spacing will always equal ((Checkbox Width - Checkmark Width) / 2) to center the checkmark */
  left: ${(props) =>
    props.checkboxSize === CheckboxSize.sm ? "0.1875rem" : space(1)};
  width: ${(props) =>
    props.checkboxSize === CheckboxSize.sm ? "0.625rem" : space(3)};
`;

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
`;

const Text = styled.span<{
  checkboxSize: CheckboxSize;
}>`
  ${(props) =>
    props.checkboxSize === CheckboxSize.sm
      ? textFont("sm", "medium")
      : textFont("md", "medium")}
  padding-left: ${(props) =>
    props.checkboxSize === CheckboxSize.sm ? space(2) : space(3)};
  color: ${color("gray", 700)};
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
        checkboxState={checkboxState}
        type="checkbox"
        name={name}
        id={name}
        disabled={disabled}
        checked={checkboxState === CheckboxState.checked ? true : false}
      />

      {checkboxState !== CheckboxState.unchecked && (
        <Checkmark checkboxSize={size}>
          {checkboxState === CheckboxState.checked ? (
            <svg
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
            </svg>
          ) : (
            <svg
              width="12"
              height="2"
              viewBox="0 0 12 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.91675 1H10.0834"
                stroke="#7F56D9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </Checkmark>
      )}

      <Text checkboxSize={size}>{label}</Text>
    </Label>
  );
}
