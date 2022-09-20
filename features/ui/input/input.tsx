import { InputHTMLAttributes } from "react";
import styled from "styled-components";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | undefined;
  iconSrc?: string | undefined;
  error?: string | undefined;
  hint?: string | undefined;
};

const StyledInput = styled.input<{
  error: string | undefined;
}>`
  &:hover {
  }

  &:focus {
  }

  &:disabled {
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
    <label>
      <span>{label}</span>
      <StyledInput error={error} {...InputProps} />
    </label>
  );
}
