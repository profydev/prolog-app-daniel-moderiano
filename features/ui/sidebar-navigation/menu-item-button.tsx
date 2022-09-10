import React from "react";
import { ButtonCSSReset } from "@features/ui";
import { ListItem, Anchor, Icon } from "./menu-item-link";
import styled from "styled-components";

const MenuButtonLink = styled.button`
  ${ButtonCSSReset}
`;

type MenuItemProps = {
  className?: string;
  text: string;
  iconSrc: string;
  onClick: () => void;
  isCollapsed: boolean;
};

export function MenuItemButton({
  className,
  text,
  onClick,
  iconSrc,
  isCollapsed,
}: MenuItemProps) {
  return (
    <ListItem className={className}>
      <Anchor as={MenuButtonLink} onClick={onClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Icon src={iconSrc} alt={`${text} icon`} /> {!isCollapsed && text}
      </Anchor>
    </ListItem>
  );
}
