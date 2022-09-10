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

export enum IconOptions {
  none = "none",
  only = "only",
  leading = "leading",
  trailing = "trailing",
}

interface ButtonProps {
  children: React.ReactNode;
  icon?: IconOptions;
  disabled?: boolean;
  size?: ButtonSize;
  color?: ButtonColor;
  onClick?: () => void;
}

export const Container = styled.button<{
  size: ButtonSize;
  color: ButtonColor;
  icon: IconOptions;
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

  /* Dynamically set styles based on button size prop */
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

  /* Dynamically set styles based on button color prop */
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
          &:disabled {
            background: ${color("primary", 200)};
            border-color: ${color("primary", 200)};
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
          &:disabled {
            background: ${color("primary", 25)};
            color: ${color("primary", 300)};
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
          &:disabled {
            background: #ffffff;
            border: 1px solid ${color("gray", 200)};
            color: ${color("gray", 300)};
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
          &:disabled {
            background: #ffffff;
            color: ${color("gray", 300)};
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
          &:disabled {
            background: #ffffff;
            color: ${color("gray", 300)};
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
          &:disabled {
            background: ${color("error", 200)};
            border-color: ${color("error", 200)};
          }
        `;

      default:
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
          &:disabled {
            background: ${color("primary", 200)};
            border-color: ${color("primary", 200)};
          }
        `;
    }
  }}

  /* Dynamically set styles based on presence and position of an icon */
  ${(props) => {
    switch (props.icon) {
      case IconOptions.only:
        return css`
          padding: 10px;
        `;

      case IconOptions.leading:
        return css``;

      case IconOptions.trailing:
        return css``;

      // Default case is not required, as "none" is the default value and requires no additional CSS
    }
  }}
`;

export function Button({
  children,
  icon = IconOptions.none,
  disabled = false,
  size = ButtonSize.md,
  color = ButtonColor.primary,
  onClick,
}: ButtonProps) {
  return (
    <Container
      onClick={onClick}
      size={size}
      color={color}
      disabled={disabled}
      icon={icon}
    >
      {children}
    </Container>
  );
}
