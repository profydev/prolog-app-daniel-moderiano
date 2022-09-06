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
  padding: ${space(6)};
  height: calc(
    ${({ theme }) => theme.size.mobileFooterHeight} - 2 * ${space(6)}
  );
  background-color: ${color("gray", 50)};

  @media (min-width: ${breakpoint("desktop")}) {
    height: calc(${({ theme }) => theme.size.desktopFooterHeight} - 2 * 13.5px);
    grid-template-areas: "version nav logo";
    padding: 13.5px 32px;
  }
`;

const Version = styled.span`
  grid-area: version;
  place-self: end center;
  color: ${color("gray", 400)};
  ${textFont("md", "regular")};

  @media (min-width: ${breakpoint("desktop")}) {
    place-self: center start;
  }
`;

const Logo = styled.img`
  grid-area: logo;
  place-self: center center;
  width: 23px;

  @media (min-width: ${breakpoint("desktop")}) {
    place-self: center end;
  }
`;

const Nav = styled.nav`
  grid-area: nav;
  place-self: start center;

  @media (min-width: ${breakpoint("desktop")}) {
    place-self: center center;
  }
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
