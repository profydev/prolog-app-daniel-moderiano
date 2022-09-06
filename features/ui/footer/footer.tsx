import styled from "styled-components";
import { color, breakpoint } from "@styles/theme";
import Link from "next/link";

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
      <nav>
        <ul>
          <li>
            <Link href="/docs">
              <a>Docs</a>
            </Link>
          </li>
          <li>
            <Link href="/help">
              <a>Help</a>
            </Link>
          </li>
          <li>
            <Link href="/api">
              <a>API</a>
            </Link>
          </li>
          <li>
            <Link href="/community">
              <a>Community</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="logo">Logo</div>
    </Container>
  );
}
