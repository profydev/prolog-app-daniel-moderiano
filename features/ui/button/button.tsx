import { color, space, textFont } from "@styles/theme";
import { ButtonHTMLAttributes } from "react";
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

export enum IconDisplay {
  none = "none",
  only = "only",
  leading = "leading",
  trailing = "trailing",
}

// These props have been grouped into a single object because it would'nt make sense to ever specify only one of them
export interface IconOptions {
  src: string;
  display: IconDisplay;
  // Critical for icon-only buttons. If not specified, an empty string alt text will be used
  altText?: string;
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconOptions;
  size?: ButtonSize;
  color?: ButtonColor;
};

// Used in place of the previous "Button" export whose only purpose was essentially providing a CSS reset to button styles
export const ButtonCSSReset = css`
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

export const Container = styled.button<{
  size: ButtonSize;
  color: ButtonColor;
  iconDisplay: IconDisplay;
}>`
  ${ButtonCSSReset}
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  gap: ${space(2)}; // relevant for spacing an icon if present
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  ${textFont("sm", "medium")}

  /* Dynamically set styles based on button size prop */
  ${(props) => {
    switch (props.size) {
      case ButtonSize.sm:
        return css`
          padding: 0.4375rem 0.875rem;
        `;

      case ButtonSize.md:
        return css`
          padding: 0.5625rem 1rem;
        `;

      case ButtonSize.lg:
        return css`
          ${textFont("md", "medium")}
          padding: 0.5625rem 1.125rem;
        `;

      case ButtonSize.xl:
        return css`
          ${textFont("md", "medium")}
          padding: 0.6875rem 1.25rem;
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
    }
  }}

  /* Please leave these declarations last so that they can take precedence over other styles above */
  flex-direction: ${(props) =>
    props.iconDisplay === IconDisplay.leading ? "row-reverse" : "row"};
  padding: ${(props) => props.iconDisplay === IconDisplay.only && "0.625rem"};
`;

export function Button({
  icon,
  size = ButtonSize.md,
  color = ButtonColor.primary,
  ...ButtonProps
}: ButtonProps) {
  return (
    <Container
      size={size}
      color={color}
      iconDisplay={icon ? icon.display : IconDisplay.none}
      {...ButtonProps}
    >
      {ButtonProps.children}
      {icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon.src} alt={icon.altText ? icon.altText : ""} />
      )}
    </Container>
  );
}
