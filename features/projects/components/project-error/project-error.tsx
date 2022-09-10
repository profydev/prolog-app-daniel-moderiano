import { ButtonCSSReset } from "@features/ui";
import { color, textFont, space } from "@styles/theme";
import styled from "styled-components";

interface ProjectErrorProps {
  refetchProjects: () => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${color("error", 25)};
  border: 1px solid ${color("error", 300)};
  border-radius: 8px;
  padding: ${space(4)};
  color: ${color("error", 700)};
  ${textFont("sm", "medium")};
`;

const ErrorButton = styled.button`
  ${ButtonCSSReset}
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  ${textFont("sm", "medium")};
  color: ${color("error", 700)};
  width: 91px;
`;

const LeftContainer = styled.div`
  display: flex;
`;

const ErrorMessage = styled.span`
  padding: ${space(0, 3)};
`;

const ArrowIcon = styled.img`
  padding-right: 3.5px;
`;

export const ProjectError = ({ refetchProjects }: ProjectErrorProps) => {
  return (
    <Container>
      <LeftContainer>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/error.svg" alt="Error icon" />
        <ErrorMessage>
          There was a problem while loading the project data
        </ErrorMessage>
      </LeftContainer>
      <ErrorButton onClick={refetchProjects}>
        Try again
        <ArrowIcon
          src="/icons/arrow-right.svg"
          alt="Arrow pointing to the right"
        />
      </ErrorButton>
    </Container>
  );
};
