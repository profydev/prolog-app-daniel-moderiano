import { IssueLevel, IssueStatus } from "@features/issues/types/issue.types";
import { Input, SelectComponent } from "@features/ui";
import styled from "styled-components";

interface OptionType {
  label: string;
  value: string;
}

const statusOptions: OptionType[] = [
  { label: "Resolved", value: IssueStatus.resolved },
  { label: "Unresolved", value: IssueStatus.open },
];

const levelOptions: OptionType[] = [
  { label: "Info", value: IssueLevel.info },
  { label: "Warning", value: IssueLevel.warning },
  { label: "Error", value: IssueLevel.error },
];

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export function IssueFilters() {
  return (
    <Container>
      <SelectComponent placeholder="Status" options={statusOptions} />
      <SelectComponent placeholder="Level" options={levelOptions} />
      <Input placeholder="Project Name" iconSrc="/icons/search.svg" />
    </Container>
  );
}
