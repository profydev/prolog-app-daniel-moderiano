import { color, space, textFont } from "@styles/theme";
import { InputHTMLAttributes } from "react";
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

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  checkboxState: CheckboxState;
  label: string;
  checkboxSize: CheckboxSize;
};

const Input = styled.input<{
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

  &:hover {
    border-color: ${color("primary", 600)};
    background-color: ${color("primary", 50)};
  }

  &:focus {
    box-shadow: 0px 0px 0px 4px ${color("primary", 100)};
    border-color: ${(props) =>
      props.checkboxState === CheckboxState.unchecked
        ? color("primary", 300)
        : color("primary", 600)};
  }

  &:disabled {
    border-color: ${color("gray", 200)};
    background-color: ${color("gray", 100)};
  }
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

  &:disabled {
    color: ${color("gray", 200)};
  }
`;

const Icon = styled.svg<{
  disabled: boolean | undefined;
}>`
  stroke: ${(props) =>
    props.disabled ? color("gray", 200) : color("primary", 600)};
`;

// const CheckboxTick = styled.svg<{
//   disabled: boolean | undefined;
// }>`
//   stroke: ${(props) =>
//     props.disabled ? color("gray", 200) : color("primary", 600)};
// `;

// const CheckboxLine = styled.svg<{
//   disabled: boolean | undefined;
// }>`
//   stroke: ${(props) =>
//     props.disabled ? color("gray", 200) : color("primary", 600)};
// `;

const Container = styled.label`
  position: relative;
  display: flex;
  align-items: center;
`;

const Label = styled.span<{
  checkboxSize: CheckboxSize;
  disabled: boolean | undefined;
}>`
  ${(props) =>
    props.checkboxSize === CheckboxSize.sm
      ? textFont("sm", "medium")
      : textFont("md", "medium")}
  padding-left: ${(props) =>
    props.checkboxSize === CheckboxSize.sm ? space(2) : space(3)};
  color: ${(props) =>
    props.disabled ? color("gray", 300) : color("gray", 700)};
`;

export function Checkbox({
  checkboxState,
  checkboxSize,
  label,
  ...CheckboxProps
}: CheckboxProps) {
  return (
    <Container htmlFor={CheckboxProps.name}>
      <Input
        checkboxSize={checkboxSize}
        checkboxState={checkboxState}
        type="checkbox"
        id={CheckboxProps.name}
        name={CheckboxProps.name}
        checked={checkboxState === CheckboxState.checked ? true : false}
        {...CheckboxProps}
      />

      {checkboxState !== CheckboxState.unchecked && (
        <Checkmark checkboxSize={checkboxSize}>
          {checkboxState === CheckboxState.checked ? (
            <Icon
              disabled={CheckboxProps.disabled}
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6666 1.5L4.24992 7.91667L1.33325 5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
          ) : (
            <Icon
              disabled={CheckboxProps.disabled}
              width="12"
              height="2"
              viewBox="0 0 12 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.91675 1H10.0834"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
          )}
        </Checkmark>
      )}

      <Label disabled={CheckboxProps.disabled} checkboxSize={checkboxSize}>
        {label}
      </Label>
    </Container>
  );
}
