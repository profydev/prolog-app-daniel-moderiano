import { IssueLevel, IssueStatus } from "@features/issues/types/issue.types";
import { Input, SelectComponent } from "@features/ui";
import { space } from "@styles/theme";
import { useRouter } from "next/router";
import styled from "styled-components";

interface OptionType {
  label: string;
  value: string;
}

const statusNames: Record<string, string> = {
  open: "Unresolved",
  resolved: "Resolved",
};

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
  const router = useRouter();
  const statusFilter = (router.query.status as string) || null;

  const handleStatusChange = (newValue: string | null) => {
    const { status, ...routerQuery } = router.query;
    if (newValue) {
      // add the filter URL query string
      router.push({
        pathname: router.pathname,
        query: { ...router.query, status: newValue },
      });
    } else {
      // remove any existing status filter form the URL
      router.push({
        pathname: router.pathname,
        query: { ...routerQuery },
      });
    }
  };

  function checkOptionTypeIsValid(option: unknown): option is OptionType {
    if (option && typeof option == "object") {
      return true;
    }

    return false;
  }

  return (
    <Container>
      <SelectComponent
        placeholder="Status"
        options={statusOptions}
        clearable={true}
        onOptionChange={(newValue) => {
          if (checkOptionTypeIsValid(newValue)) {
            handleStatusChange(newValue.value);
          } else {
            handleStatusChange(null);
          }
        }}
        value={
          statusFilter
            ? {
                label: statusNames[statusFilter],
                value: statusNames[statusFilter],
              }
            : null
        }
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
