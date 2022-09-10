import styled from "styled-components";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "lg",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  empty = "empty",
  emptyGray = "emptyGray",
  gray = "gray",
  error = "error",
}

interface ButtonProps {
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  onClick: () => void;
}

export const Container = styled.button<{
  size: ButtonSize;
  color: ButtonColor;
}>`
  cursor: pointer;

  // remove default button styles
  border: none;
  margin: 0;
  padding: 0;
  background: transparent;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

export function Button({
  children,
  size = ButtonSize.md,
  color = ButtonColor.primary,
  onClick,
}: ButtonProps) {
  return (
    <Container onClick={onClick} size={size} color={color}>
      {children}
    </Container>
  );
}
