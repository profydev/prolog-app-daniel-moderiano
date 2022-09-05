import styled from "styled-components";
import { color } from "@styles/theme";

const Container = styled.footer`
  height: ${({ theme }) => theme.size.footerHeight};
  /* margin-top: 2rem; */
  background-color: ${color("gray", 50)};
  color: ${color("gray", 500)};
  /* flex-grow: 1; */
`;

export function Footer() {
  return <Container>Footer</Container>;
}
