import { IssueLevel, IssueStatus } from "@features/issues/types/issue.types";
import { Input, SelectComponent } from "@features/ui";
import { breakpoint, space } from "@styles/theme";
import { NextRouter, useRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";

interface OptionType {
  label: string;
  value: string;
}

// React-select deals in unknown option types. This is used to safely cast the select input values to our option type.
function isOptionTypeValid(option: unknown): option is OptionType {
  return option !== null && typeof option === "object" && "value" in option;
}

// Uses the Record type to allow us to index via string names
const statusNames: Record<string, string> = {
  open: "Unresolved",
  resolved: "Resolved",
};

const levelNames: Record<string, string> = {
  info: "Info",
  warning: "Warning",
  error: "Error",
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
  display: flex;
  flex-direction: column;
  gap: ${space(4)};

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    width: 50%;
  }

  @media (min-width: ${breakpoint("issueOptionsBreak")}) {
    display: grid;
    grid-template-columns: 10rem minmax(8.5rem, 10rem) minmax(10rem, 17.5rem);
    justify-content: end;
  }
`;

// Defined outside the component to make useCallback/useEffect dependency decisions easier to understand
const updateQueryParams = (
  router: NextRouter,
  param: string,
  newValue: string | null
) => {
  const query = { ...router.query };

  if (newValue) {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [param]: newValue },
    });
  } else {
    delete query[param]; // do not mutate the router.query object directly
    router.push({
      pathname: router.pathname,
      query: { ...query },
    });
  }
};

export function IssueFilters() {
  const router = useRouter();
  const { status, level } = router.query;
  const statusFilter = typeof status === "string" ? status : null;
  const levelFilter = typeof level === "string" ? level : null;
  const debouncedHandler = debounce(updateQueryParams, 1000);

  return (
    <Container>
      <SelectComponent
        placeholder="Status"
        options={statusOptions}
        clearable={true}
        onOptionChange={(newValue) =>
          updateQueryParams(
            router,
            "status",
            isOptionTypeValid(newValue) ? newValue.value : null
          )
        }
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
        onOptionChange={(newValue) =>
          updateQueryParams(
            router,
            "level",
            isOptionTypeValid(newValue) ? newValue.value : null
          )
        }
        value={
          levelFilter
            ? {
                label: levelNames[levelFilter],
                value: levelNames[levelFilter],
              }
            : null
        }
      />
      <Input
        placeholder="Project Name"
        iconSrc="/icons/search.svg"
        onChange={(event) =>
          debouncedHandler(router, "project", event.target.value)
        }
        data-cy="projectInput"
      />
    </Container>
  );
}
