import { color, textFont } from "@styles/theme";
import styled, { css } from "styled-components";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
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
  onClick?: () => void;
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

  /* Add new default styles */
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);

  /* Dynamically set props based on button size prop */
  ${(props) => {
    switch (props.size) {
      case ButtonSize.sm:
        return css`
          ${textFont("sm", "medium")}
          padding: 8px 14px;
        `;

      case ButtonSize.md:
        return css`
          ${textFont("sm", "medium")}
          padding: 10px 16px;
        `;

      case ButtonSize.lg:
        return css`
          ${textFont("md", "medium")}
          padding: 10px 18px;
        `;

      case ButtonSize.xl:
        return css`
          ${textFont("md", "medium")}
          padding: 12px 20px;
        `;

      default:
        return css`
          ${textFont("sm", "medium")}
          padding: 10px 16px;
        `;
    }
  }}

  /* Dynamically set props based on button color prop */
  ${(props) => {
    switch (props.color) {
      case ButtonColor.primary:
        return css`
          background: ${color("primary", 600)};
          color: #ffffff;
          border: 1px solid ${color("primary", 600)};
          &:hover {
            background: ${color("primary", 700)};
            border-color: ${color("primary", 700)};
          }
          &:focus {
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
              0px 0px 0px 4px ${color("primary", 100)};
          }
        `;

      case ButtonColor.secondary:
        return css`
          background: ${color("primary", 50)};
          color: ${color("primary", 700)};
          border: 1px solid ${color("primary", 50)};
          &:hover {
            background: ${color("primary", 100)};
            border-color: ${color("primary", 100)};
          }
          &:focus {
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
              0px 0px 0px 4px ${color("primary", 100)};
          }
        `;

      case ButtonColor.gray:
        return css`
          background: #ffffff;
          color: ${color("gray", 700)};
          border: 1px solid ${color("gray", 300)};
          &:hover {
            background: ${color("gray", 50)};
            color: ${color("gray", 800)};
          }
          &:focus {
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
              0px 0px 0px 4px ${color("gray", 100)};
          }
        `;

      case ButtonColor.empty:
        return css`
          background: #ffffff;
          color: ${color("primary", 700)};
          border: none;
          box-shadow: none;
          &:hover {
            background: ${color("primary", 50)};
          }
        `;

      case ButtonColor.emptyGray:
        return css`
          background: #ffffff;
          color: ${color("gray", 500)};
          border: none;
          box-shadow: none;
          &:hover {
            background: ${color("gray", 50)};
            color: ${color("gray", 600)};
          }
        `;

      case ButtonColor.error:
        return css`
          background: ${color("error", 600)};
          color: #ffffff;
          border: 1px solid ${color("error", 600)};
          &:hover {
            background: ${color("error", 700)};
            border-color: ${color("error", 700)};
          }
          &:focus {
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
              0px 0px 0px 4px ${color("error", 100)};
          }
        `;

      default:
        return css`
          background: ${color("primary", 600)};
          color: #ffffff;
          border: 1px solid ${color("primary", 600)};
        `;
    }
  }}
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
