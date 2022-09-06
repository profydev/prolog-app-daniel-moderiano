import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { color, space, textFont } from "@styles/theme";

type FooterItemProps = {
  text: string;
  href: string;
};

const ListItem = styled.li`
  padding: ${space(0, 3)};
`;

const Anchor = styled.a`
  text-decoration: none;
  color: ${color("gray", 500)};
  ${textFont("md", "medium")};
`;

export function FooterItemLink({ text, href }: FooterItemProps) {
  return (
    <ListItem>
      <Link href={href} passHref>
        <Anchor>{text}</Anchor>
      </Link>
    </ListItem>
  );
}
