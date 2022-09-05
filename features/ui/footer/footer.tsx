import styled from "styled-components";
import { color, breakpoint } from "@styles/theme";

const Container = styled.footer`
  height: ${({ theme }) => theme.size.mobileFooterHeight};
  background-color: ${color("gray", 50)};
  color: ${color("gray", 500)};

  @media (min-width: ${breakpoint("desktop")}) {
    height: ${({ theme }) => theme.size.desktopFooterHeight};
  }
`;

export function Footer() {
  return <Container>Footer</Container>;
}
