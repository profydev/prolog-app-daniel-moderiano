import { useRouter } from "next/router";
import styled from "styled-components";
import { IssueFilters, useIssues } from "@features/issues";
import { ProjectLanguage, useProjects } from "@features/projects";
import { breakpoint, color, space, textFont } from "@styles/theme";
import { IssueRow } from "./Issue-row";
import { Button } from "@features/ui";
import {
  ButtonColor,
  ButtonSize,
  IconDisplay,
} from "@features/ui/button/button";

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding-bottom: 1.56rem;
  gap: ${space(4)};

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 100%;
  }
`;

const ButtonContainer = styled.div`
  flex-shrink: 0;
  width: 100%;
  display: flex;
  align-items: center;

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    flex-shrink: 1;
    max-width: 50%;
  }

  @media (min-width: ${breakpoint("issueOptionsBreak")}) {
    width: auto;
    max-width: auto;
  }
`;

const ListContainer = styled.div`
  background: white;
  border: none;
  box-sizing: border-box;
  box-shadow: none;
  border-radius: ${space(2)};
  overflow: hidden;

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    border: 1px solid ${color("gray", 200)};
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
      0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    table-layout: auto;
  }
`;

const HeaderRow = styled.tr`
  border-bottom: 1px solid ${color("gray", 200)};
`;

const TableHead = styled.thead`
  left: -9999px;
  position: absolute;
  visibility: hidden;

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    position: static;
    left: auto;
    visibility: visible;
  }
`;

const HeaderCell = styled.th`
  padding: ${space(3, 6)};
  text-align: left;
  color: ${color("gray", 500)};
  ${textFont("xs", "medium")};
`;

const PaginationContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: ${space(4, 6)};
  border-top: 1px solid ${color("gray", 200)};

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    display: flex;
  }
`;

const PaginationButton = styled.button`
  height: 38px;
  padding: ${space(0, 4)};
  background: white;
  border: 1px solid ${color("gray", 300)};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;

  &:not(:first-of-type) {
    margin-left: ${space(3)};
  }
`;

const MobilePaginationContainer = styled.div`
  margin-bottom: ${space(4)};

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    display: none;
  }
`;

const PageInfo = styled.div`
  color: ${color("gray", 700)};
  ${textFont("sm", "regular")}
`;

const PageNumber = styled.span`
  ${textFont("sm", "medium")}
`;

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const statusFilter =
    typeof router.query.status === "string" ? router.query.status : null;
  const levelFilter =
    typeof router.query.level === "string" ? router.query.level : null;
  const projectFilter =
    typeof router.query.project === "string" ? router.query.project : null;

  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });

  const projects = useProjects();
  const issuesPage = useIssues(page, {
    status: statusFilter,
    level: levelFilter,
    project: projectFilter,
  });

  const { items, meta } = issuesPage.data || {};

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>
  );

  return (
    <div>
      <OptionsContainer>
        <ButtonContainer>
          <Button
            size={ButtonSize.lg}
            icon={{
              src: "/icons/tick-white.svg",
              display: IconDisplay.leading,
            }}
          >
            Resolve selected issues
          </Button>
        </ButtonContainer>
        <IssueFilters />
      </OptionsContainer>
      <ListContainer>
        <Table>
          <TableHead>
            <HeaderRow>
              <HeaderCell>Issue</HeaderCell>
              <HeaderCell>Level</HeaderCell>
              <HeaderCell>Events</HeaderCell>
              <HeaderCell>Users</HeaderCell>
            </HeaderRow>
          </TableHead>
          <tbody>
            {(items || []).map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
              />
            ))}
          </tbody>
        </Table>
        <PaginationContainer>
          <div>
            <PaginationButton
              onClick={() => navigateToPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </PaginationButton>
            <PaginationButton
              onClick={() => navigateToPage(page + 1)}
              disabled={page === meta?.totalPages}
            >
              Next
            </PaginationButton>
          </div>
          <PageInfo>
            Page <PageNumber>{meta?.currentPage}</PageNumber> of{" "}
            <PageNumber>{meta?.totalPages}</PageNumber>
          </PageInfo>
        </PaginationContainer>

        <MobilePaginationContainer>
          <Button
            onClick={() => alert("To be implemented")}
            color={ButtonColor.gray}
          >
            Load more
          </Button>
        </MobilePaginationContainer>
      </ListContainer>
    </div>
  );
}
