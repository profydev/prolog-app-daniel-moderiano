import { color, textFont } from "@styles/theme";
import { InputHTMLAttributes } from "react";
import styled from "styled-components";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | undefined;
  iconSrc?: string | undefined;
  error?: boolean;
  errorMsg?: string | undefined;
  hintMsg?: string | undefined;
};

const Container = styled.label`
  display: flex;
  flex-direction: column;
`;

const LabelText = styled.span`
  ${textFont("sm", "medium")}
  color: ${color("gray", 700)};
  padding-bottom: 6px;
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

const Error = styled.span`
  ${textFont("sm", "regular")}
  color: ${color("error", 500)};
  padding-top: 6px;
`;

const Hint = styled.span`
  ${textFont("sm", "regular")}
  color: ${color("gray", 500)};
  padding-top: 6px;
`;

const StyledInput = styled.input<{
  error: boolean;
  iconSrc: string | undefined;
}>`
  box-sizing: border-box;
  padding: ${(props) =>
    props.iconSrc ? "9px 14px 9px 42px" : "9px 14px 9px 14px"};
  width: 20rem;
  background: #ffffff;
  border: 1px solid
    ${(props) => (props.error ? color("error", 300) : color("gray", 300))};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  ${textFont("md", "regular")};
  color: ${color("gray", 900)};

  &::placeholder {
    color: ${color("gray", 500)};
    ${textFont("md", "regular")};
  }

  &:focus {
    border-color: ${(props) =>
      props.error ? color("error", 300) : color("primary", 300)};
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
      0px 0px 0px 4px ${(props) => (props.error ? "#FEE4E2" : "#F4EBFF")};
    outline: none;
  }

  &:disabled {
    background: ${color("gray", 50)};
    color: ${color("gray", 500)};
  }
`;

export function Input({
  label,
  error = false,
  errorMsg,
  hintMsg,
  iconSrc,
  ...InputProps
}: InputProps) {
  return (
    <Container>
      <LabelText>{label}</LabelText>
      <InputContainer>
        {iconSrc && <Icon src={iconSrc} alt="" />}
        <StyledInput iconSrc={iconSrc} error={error} {...InputProps} />
      </InputContainer>

      {/* Preferentially display an error message over a hint message when both are present */}
      {/* TODO: Accessibility concerns to associate these with the input */}
      {error && errorMsg ? (
        <Error>{errorMsg}</Error>
      ) : (
        hintMsg && <Hint>{hintMsg}</Hint>
      )}
    </Container>
  );
}
