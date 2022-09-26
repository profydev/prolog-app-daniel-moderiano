import { IssueLevel, IssueStatus } from "@features/issues/types/issue.types";
import { Input, SelectComponent } from "@features/ui";
import { space } from "@styles/theme";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDebounceValue } from "./use-debounce-value";

interface OptionType {
  label: string;
  value: string;
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

export function IssueFilters() {
  const router = useRouter();
  const statusFilter =
    typeof router.query.status === "string" ? router.query.status : null;
  const levelFilter =
    typeof router.query.level === "string" ? router.query.level : null;
  const projectFilter =
    typeof router.query.project === "string" ? router.query.project : null;

  // We must debounce the project filter to avoid an API call on every character the user types.
  const [realTimeValue, setRealTimeValue] = useState("");
  const debouncedValue = useDebounceValue(realTimeValue, 1000);

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

  const handleLevelChange = (newValue: string | null) => {
    const { level, ...routerQuery } = router.query;
    if (newValue) {
      // add the filter URL query string
      router.push({
        pathname: router.pathname,
        query: { ...router.query, level: newValue },
      });
    } else {
      // remove any existing level filter form the URL
      router.push({
        pathname: router.pathname,
        query: { ...routerQuery },
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRealTimeValue(event.currentTarget.value);
  };

  useEffect(() => {
    const { project, ...routerQuery } = router.query;
    if (debouncedValue.length > 0) {
      // add the filter URL query string
      router.push({
        pathname: router.pathname,
        query: { ...router.query, project: debouncedValue },
      });
    } else {
      // remove any existing project filter form the URL
      router.push({
        pathname: router.pathname,
        query: { ...routerQuery },
      });
    }

    // router dependency will cause infinite loop, and this effect does not need to run on unrelated router changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

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
        onOptionChange={(newValue) => {
          if (checkOptionTypeIsValid(newValue)) {
            handleLevelChange(newValue.value);
          } else {
            handleLevelChange(null);
          }
        }}
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
        onChange={handleChange}
        data-cy="projectInput"
        value={realTimeValue} // ? Is it helpful to make this a controlled input?
      />
    </Container>
  );
}
