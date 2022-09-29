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
  display: none;

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

const MobileRow = styled.tr`
  border: 1px solid ${color("gray", 200)};
  padding: ${space(3, 6)};
  display: flex;
  flex-direction: column;
  gap: ${space(2)};
  margin-bottom: ${space(4)};
  border-collapse: separate;
  border-radius: ${space(2)};
  border-spacing: 0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    display: none;
  }
`;

const Cell = styled.td`
  padding: 0;
  color: ${color("gray", 500)};
  ${textFont("sm", "regular")};

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    padding: ${space(4, 6)};
  }
`;

const IssueCell = styled(Cell)`
  display: flex;
  align-items: center;
  padding: ${space(4, 0)};

  @media (min-width: ${breakpoint("issueTableBreak")}) {
    padding: ${space(4, 6)};
  }
`;

const StatsCell = styled.td`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.625rem;
  padding: ${space(4, 0)};
`;

const InnerCellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${space(2)};
  padding: 0;
  width: 100%;
  color: ${color("gray", 500)};
  ${textFont("sm", "regular")};
`;

const CellTitle = styled.span`
  color: ${color("gray", 500)};
  ${textFont("sm", "medium")}
`;

const LanguageIcon = styled.img`
  width: ${space(10)};
  margin-right: ${space(3)};
`;

const ErrorContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
    <>
      <Row>
        <IssueCell>
          <LanguageIcon
            src={`/icons/${projectLanguage}.svg`}
            alt={projectLanguage}
          />
          <div>
            <ErrorTypeAndMessage>
              <ErrorType>{name}:&nbsp;</ErrorType>
              <span>{message}</span>
            </ErrorTypeAndMessage>
            <div>{firstLineOfStackTrace}</div>
          </div>
        </IssueCell>
        <Cell>
          <Badge color={levelColors[level]} size={BadgeSize.sm}>
            {capitalize(level)}
          </Badge>
        </Cell>
        <Cell>{numEvents}</Cell>
        <Cell>{numUsers}</Cell>
      </Row>

      <MobileRow>
        <IssueCell>
          <LanguageIcon
            src={`/icons/${projectLanguage}.svg`}
            alt={projectLanguage}
          />
          <ErrorContainer>
            <ErrorTypeAndMessage>
              <ErrorType>{name}:&nbsp;</ErrorType>
              {message}
            </ErrorTypeAndMessage>
            <div>{firstLineOfStackTrace}</div>
          </ErrorContainer>
        </IssueCell>
        <StatsCell>
          <InnerCellContainer>
            <CellTitle>Status</CellTitle>
            <Badge color={levelColors[level]} size={BadgeSize.sm}>
              {capitalize(level)}
            </Badge>
          </InnerCellContainer>
          <InnerCellContainer>
            <CellTitle>Events</CellTitle>
            {numEvents}
          </InnerCellContainer>
          <InnerCellContainer>
            <CellTitle>Users</CellTitle>
            {numUsers}
          </InnerCellContainer>
        </StatsCell>
      </MobileRow>
    </>
  );
}
