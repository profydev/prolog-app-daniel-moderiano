import { color, textFont } from "@styles/theme";
import { InputHTMLAttributes } from "react";
import styled from "styled-components";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | undefined;
  iconSrc?: string | undefined;
  error?: string | undefined;
  hint?: string | undefined;
};

const Label = styled.label`
  /* position: relative; */
`;

const InputContainer = styled.div`
  position: relative;
`;

const Icon = styled.img`
  position: absolute;
  height: 20px;
  width: 20px;
  left: 14px;
  top: 12px;
`;

const StyledInput = styled.input<{
  error: string | undefined;
  iconSrc: string | undefined;
}>`
  /* display: flex;
  align-items: center; */
  box-sizing: border-box;
  padding: ${(props) =>
    props.iconSrc ? "9px 14px 9px 42px" : "9px 14px 9px 14px"};
  width: 20rem;
  background: #ffffff;
  border: 1px solid ${color("gray", 300)};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  ${textFont("md", "regular")};
  color: ${color("gray", 900)};

  &::placeholder {
    color: ${color("gray", 500)};
    ${textFont("md", "regular")};
  }

  &:focus {
    border-color: ${color("primary", 300)};
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #f4ebff;
    outline: none;
  }

  &:disabled {
    background: ${color("gray", 50)};
    color: ${color("gray", 500)};
  }
`;

export function Input({
  label,
  error,
  hint,
  iconSrc,
  ...InputProps
}: InputProps) {
  return (
    <Label>
      <span>{label}</span>
      <InputContainer>
        {iconSrc && <Icon src={iconSrc} alt="" />}
        <StyledInput iconSrc={iconSrc} error={error} {...InputProps} />
      </InputContainer>
    </Label>
  );
}
