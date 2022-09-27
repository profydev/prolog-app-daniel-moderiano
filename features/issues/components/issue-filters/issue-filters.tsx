import { IssueLevel, IssueStatus } from "@features/issues/types/issue.types";
import { Input, SelectComponent } from "@features/ui";
import { space } from "@styles/theme";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDebounceValue } from "./use-debounce-value";

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
  display: grid;
  grid-template-columns: 10rem 10rem 17.5rem;
  align-items: center;
  justify-content: end;
  gap: ${space(4)};
  padding-bottom: 1.125rem;
`;

// Defined outside the component to make useCallback/useEffect dependency decisions easier to understand
const updateQueryParams = (
  router: NextRouter,
  param: string,
  newValue: string | null
) => {
  if (newValue) {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [param]: newValue },
    });
  } else {
    delete router.query[param];
    router.push({
      pathname: router.pathname,
      query: { ...router.query },
    });
  }
};

export function IssueFilters() {
  const router = useRouter();
  const { status, level } = router.query;
  const statusFilter = typeof status === "string" ? status : null;
  const levelFilter = typeof level === "string" ? level : null;

  // We must debounce the project filter input to avoid an API call every time the user types a character.
  const [realTimeValue, setRealTimeValue] = useState("");
  const debouncedValue = useDebounceValue(realTimeValue, 1000);

  // Adding router as a dependency causes an infinite render loop! The intended behaviour is to only run this effect for changes to debounced value, not for router changes. It is appropriate to omit router as a dependency here (NextJS docs also do the same).
  useEffect(() => {
    if (debouncedValue) {
      // avoid modfying router on initial render as debouncedValue wont't yet exist
      updateQueryParams(router, "project", debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

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
        onChange={(event) => setRealTimeValue(event.currentTarget.value)}
        data-cy="projectInput"
        value={realTimeValue}
      />
    </Container>
  );
}
