import styled from "styled-components";
import { ProjectCard } from "../project-card";
import { useProjects } from "../../api/use-projects";
import { breakpoint, space } from "@styles/theme";
import { Input, Spinner } from "@features/ui";
import { ProjectError } from "../project-error";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: ${space(6)};

  // reset list styles
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: ${breakpoint("desktop")}) {
    grid-template-columns: repeat(auto-fit, 400px);
  }
`;

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useProjects();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.error(error);
    return <ProjectError refetchProjects={refetch} />;
  }

  return (
    <div>
      <Input placeholder="olivia@untitledui.com" iconSrc="/icons/mail.svg" />
      <List data-cy="projectList">
        {data?.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </List>
    </div>
  );
}
