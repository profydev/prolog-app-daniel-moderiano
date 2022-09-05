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
  return (
    <Container>
      <div className="version">14.5.1</div>
      <ul>
        <li>Docs</li>
        <li>Help</li>
        <li>API</li>
        <li>Community</li>
      </ul>
      <div className="logo">Logo</div>
    </Container>
  );
}
