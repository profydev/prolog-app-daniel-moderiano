import { IssueLevel, IssueStatus } from "@features/issues/types/issue.types";
import { Input, SelectComponent } from "@features/ui";
import { space } from "@styles/theme";
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
  display: grid;
  grid-template-columns: 10rem 10rem 17.5rem;
  align-items: center;
  justify-content: end;
  gap: ${space(4)};
  padding-bottom: 1.125rem;
`;

export function IssueFilters() {
  return (
    <Container>
      <SelectComponent
        placeholder="Status"
        options={statusOptions}
        clearable={true}
      />
      <SelectComponent
        placeholder="Level"
        options={levelOptions}
        clearable={true}
      />
      <Input placeholder="Project Name" iconSrc="/icons/search.svg" />
    </Container>
  );
}
