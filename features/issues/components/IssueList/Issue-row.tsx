import styled from "styled-components";
import capitalize from "lodash/capitalize";
import { breakpoint, color, space, textFont } from "@styles/theme";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { IssueLevel } from "../../types/issue.types";
import { ProjectLanguage } from "@features/projects";
import type { Issue } from "../../types/issue.types";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

const Row = styled.tr`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  row-gap: 0.5625rem;
  column-gap: 0.625rem;
  border: 1px solid ${color("gray", 200)};
  padding: ${space(3, 6)};
  margin-bottom: ${space(4)};
  border-radius: ${space(2)};
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    border: none;
    display: table-row;
    margin-bottom: 0;
    box-shadow: none;

    &:nth-child(2n) {
      background: ${color("gray", 50)};
    }
  }
`;

const Cell = styled.td`
  padding: ${space(4, 0)};
  color: ${color("gray", 500)};
  ${textFont("sm", "regular")};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${space(2)};
  width: 100%;

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    display: table-cell;
    width: auto;
    gap: 0;
    padding: ${space(4, 6)};
  }
`;

const IssueCell = styled(Cell)`
  display: flex;
  flex-direction: row;
  padding: ${space(4, 0)};
  grid-column: 1 / span 3;

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    padding: ${space(4, 6)};
  }
`;

const CellTitle = styled.span`
  ${textFont("sm", "medium")};

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    display: none;
  }
`;

const LanguageIcon = styled.img`
  width: ${space(10)};
  margin-right: ${space(3)};
`;

const ErrorContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    white-space: normal;
  }
`;

const ErrorTypeAndMessage = styled.div`
  color: ${color("gray", 900)};
`;

const ErrorType = styled.span`
  ${textFont("sm", "medium")};
`;

export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];
  return (
    <Row>
      <IssueCell>
        <LanguageIcon
          src={`/icons/${projectLanguage}.svg`}
          alt={projectLanguage}
        />
        <ErrorContainer>
          <ErrorTypeAndMessage>
            <ErrorType>{name}:&nbsp;</ErrorType>
            <span>{message}</span>
          </ErrorTypeAndMessage>
          <div>{firstLineOfStackTrace}</div>
        </ErrorContainer>
      </IssueCell>
      <Cell>
        <CellTitle>Status</CellTitle>
        <Badge color={levelColors[level]} size={BadgeSize.sm}>
          {capitalize(level)}
        </Badge>
      </Cell>
      <Cell>
        <CellTitle>Events</CellTitle>
        {numEvents}
      </Cell>
      <Cell>
        <CellTitle>Users</CellTitle>
        {numUsers}
      </Cell>
    </Row>
  );
}
