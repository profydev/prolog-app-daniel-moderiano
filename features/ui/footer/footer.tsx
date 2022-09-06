import styled from "styled-components";
import { color, breakpoint, textFont, space } from "@styles/theme";
import Link from "next/link";
import { version } from "config/version";

const Container = styled.footer`
  display: grid;
  grid-template-areas:
    "nav"
    "logo"
    "version";
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  padding: ${space(6)};

  height: ${({ theme }) => theme.size.mobileFooterHeight};
  background-color: ${color("gray", 50)};

  @media (min-width: ${breakpoint("desktop")}) {
    height: ${({ theme }) => theme.size.desktopFooterHeight};
    grid-template-areas: "version nav logo";
  }
`;

const Version = styled.span`
  grid-area: version;
  place-self: end center;
  color: ${color("gray", 400)};
  ${textFont("md", "regular")};
`;

const Logo = styled.img`
  grid-area: logo;
  place-self: center center;
`;

const Nav = styled.nav`
  grid-area: nav;
  place-self: start center;
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: ${space(0, 3)};
`;

const Anchor = styled.a`
  text-decoration: none;
  color: ${color("gray", 500)};
  ${textFont("md", "medium")};
`;

export function Footer() {
  return (
    <Container>
      <Version className="version">Version: {version}</Version>
      <Nav>
        <LinkList>
          <ListItem>
            <Link href="/docs" passHref>
              <Anchor>Docs</Anchor>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/api" passHref>
              <Anchor>API</Anchor>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/help" passHref>
              <Anchor>Help</Anchor>
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
