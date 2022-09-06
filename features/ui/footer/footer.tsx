import styled from "styled-components";
import { color, breakpoint } from "@styles/theme";
import Link from "next/link";
import { version } from "config/version";

const Container = styled.footer`
  display: grid;
  grid-template-areas:
    "nav"
    "logo"
    "version";

  height: ${({ theme }) => theme.size.mobileFooterHeight};
  background-color: ${color("gray", 50)};
  color: ${color("gray", 500)};

  @media (min-width: ${breakpoint("desktop")}) {
    height: ${({ theme }) => theme.size.desktopFooterHeight};
    grid-template-areas: "version nav logo";
  }
`;

const Version = styled.span`
  grid-area: version;
`;

const Logo = styled.img`
  grid-area: logo;
`;

const Nav = styled.nav`
  grid-area: nav;
`;

export function Footer() {
  return (
    <Container>
      <Version className="version">{version}</Version>
      <Nav>
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
      </Nav>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Logo alt="logo" src="/icons/logo-small.svg" />
    </Container>
  );
}
