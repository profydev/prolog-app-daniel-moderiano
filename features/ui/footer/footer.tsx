import styled from "styled-components";
import { Routes } from "@config/routes";
import { color, breakpoint, textFont, space } from "@styles/theme";
import { version } from "config/version";
import { FooterItemLink } from "./footer-item-link";

const footerItems = [
  { text: "Docs", href: Routes.docs },
  { text: "API", href: Routes.api },
  { text: "Help", href: Routes.help },
  { text: "Community", href: Routes.community },
];

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
    grid-template-columns: repeat(3, 1fr);
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

export function Footer() {
  return (
    <Container>
      <Version className="version">Version: {version}</Version>
      <Nav>
        <LinkList>
          {footerItems.map((footerItem, index) => (
            <FooterItemLink key={index} {...footerItem} />
          ))}
        </LinkList>
      </Nav>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Logo alt="logo" src="/icons/logo-small.svg" />
    </Container>
  );
}
