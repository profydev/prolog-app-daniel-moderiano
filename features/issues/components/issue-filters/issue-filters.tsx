import { IssueLevel, IssueStatus } from "@features/issues/types/issue.types";
import { Input, SelectComponent } from "@features/ui";
import { space } from "@styles/theme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

function checkOptionTypeIsValid(option: unknown): option is OptionType {
  if (option && typeof option == "object") {
    return true;
  }
  return false;
}

export function IssueFilters() {
  const router = useRouter();
  const statusFilter =
    typeof router.query.status === "string" ? router.query.status : null;
  const levelFilter =
    typeof router.query.level === "string" ? router.query.level : null;
  const projectFilter =
    typeof router.query.project === "string" ? router.query.project : null;

  // We must debounce the project filter input to avoid an API call every time the user types a character.
  const [realTimeValue, setRealTimeValue] = useState("");
  const debouncedValue = useDebounceValue(realTimeValue, 1000);

  // * This might be useful to move outside the component for eadability and to make the router dependency more obvious. It does mean router will be a required argument however.
  const updateQueryParams = (param: string, newValue: string | null) => {
    if (newValue) {
      // add the filter URL query string
      router.push({
        pathname: router.pathname,
        query: { ...router.query, [param]: newValue },
      });
    } else {
      // remove any existing filters for this param form the URL
      delete router.query[param];
      router.push({
        pathname: router.pathname,
        query: { ...router.query },
      });
    }
  };

  // Update router params when debouncedValue changes. However, the intended behaviour is NOT to re-run everytime router (and therefore updateQueryParams) changes. Hence it is left out of the deps array. Also it's includion causes an infinite loop.
  useEffect(() => {
    updateQueryParams("project", debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <Container>
      <SelectComponent
        placeholder="Status"
        options={statusOptions}
        clearable={true}
        onOptionChange={(newValue) => {
          if (checkOptionTypeIsValid(newValue)) {
            updateQueryParams("status", newValue.value);
          } else {
            updateQueryParams("status", null);
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
            updateQueryParams("level", newValue.value);
          } else {
            updateQueryParams("level", null);
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
        onChange={(event) => setRealTimeValue(event.currentTarget.value)}
        data-cy="projectInput"
        value={realTimeValue} // ? Is it helpful to make this a controlled input?
      />
    </Container>
  );
}
