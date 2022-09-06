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

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li``;

const Anchor = styled.a`
  text-decoration: none;
  color: ${color("gray", 500)};
`;

export function Footer() {
  return (
    <Container>
      <Version className="version">{version}</Version>
      <Nav>
        <LinkList>
          <ListItem>
            <Link href="/docs" passHref>
              <Anchor>Docs</Anchor>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/help" passHref>
              <Anchor>Help</Anchor>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/api" passHref>
              <Anchor>API</Anchor>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/community" passHref>
              <Anchor>Community</Anchor>
            </Link>
          </ListItem>
        </LinkList>
      </Nav>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Logo alt="logo" src="/icons/logo-small.svg" />
    </Container>
  );
}
