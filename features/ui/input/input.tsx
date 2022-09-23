import { color, space, textFont } from "@styles/theme";
import { InputHTMLAttributes, useRef } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

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
  max-width: 20rem;
`;

const LabelText = styled.span`
  ${textFont("sm", "medium")}
  color: ${color("gray", 700)};
  padding-bottom: 0.375rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{
  error: boolean;
  iconSrc: string | undefined;
}>`
  box-sizing: border-box;
  width: 100%;
  padding-top: 0.5625rem;
  padding-bottom: 0.5625rem;
  padding-left: ${(props) => (props.iconSrc ? "2.625rem" : "0.875rem")};
  padding-right: ${(props) => (props.error ? "2.375rem" : "0.875rem")};
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
      0px 0px 0px 4px
        ${(props) =>
          props.error ? color("error", 100) : color("primary", 100)};
    outline: none;
  }

  &:disabled {
    background: ${color("gray", 50)};
    color: ${color("gray", 500)};
  }
`;

const Icon = styled.img`
  position: absolute;
  height: ${space(5)};
  width: ${space(5)};
  left: 0.875rem;
  top: ${space(3)};
`;

const Error = styled.span`
  ${textFont("sm", "regular")}
  color: ${color("error", 500)};
  padding-top: 0.375rem;
`;

const Hint = styled.span`
  ${textFont("sm", "regular")}
  color: ${color("gray", 500)};
  padding-top: 0.375rem;
`;

const StyledErrorIcon = styled.svg`
  position: absolute;
  right: 0.875rem;
  top: 0.875rem;
  width: ${space(4)};
  height: ${space(4)};
`;

const ErrorIcon = () => (
  <StyledErrorIcon
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 6.66675V10.0001M10 13.3334H10.0084M18.3334 10.0001C18.3334 14.6025 14.6024 18.3334 10 18.3334C5.39765 18.3334 1.66669 14.6025 1.66669 10.0001C1.66669 5.39771 5.39765 1.66675 10 1.66675C14.6024 1.66675 18.3334 5.39771 18.3334 10.0001Z"
      stroke="#D92D20"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledErrorIcon>
);

export function Input({
  label,
  error = false,
  errorMsg,
  hintMsg,
  iconSrc,
  ...InputProps
}: InputProps) {
  const messageId = useRef(nanoid());

  return (
    <Container>
      <LabelText>{label}</LabelText>
      <InputContainer>
        {iconSrc && <Icon src={iconSrc} alt="" />}
        <StyledInput
          aria-describedby={errorMsg || hintMsg ? messageId.current : undefined}
          iconSrc={iconSrc}
          error={error}
          {...InputProps}
        />
        {error && <ErrorIcon />}
      </InputContainer>

      {/* Preferentially display an error message over a hint message when both are present */}
      {error && errorMsg ? (
        <Error id={messageId.current}>{errorMsg}</Error>
      ) : (
        hintMsg && <Hint id={messageId.current}>{hintMsg}</Hint>
      )}
    </Container>
  );
}
