import styled from "styled-components";
import { color, breakpoint } from "@styles/theme";
import Link from "next/link";
import { version } from "config/version";

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
      <div className="version">{version}</div>
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="logo" src="/icons/logo-small.svg" />
    </Container>
  );
}
