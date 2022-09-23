import { Input, SelectComponent } from "@features/ui";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export function IssueFilters() {
  return (
    <Container>
      <SelectComponent placeholder="Status" />
      <SelectComponent placeholder="Level" />
      <Input placeholder="Project Name" iconSrc="/icons/search.svg" />
    </Container>
  );
}
