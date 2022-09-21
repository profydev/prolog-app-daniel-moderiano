import styled from "styled-components";
import { ProjectCard } from "../project-card";
import { useProjects } from "../../api/use-projects";
import { breakpoint, space } from "@styles/theme";
import { SelectComponent, Spinner } from "@features/ui";
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
      <SelectComponent
        iconSrc="/icons/person.svg"
        options={[
          { value: "Phoenix Baker", label: "Phoenix Baker" },
          { value: "Olivia Rhye", label: "Olivia Rhye" },
          { value: "Lana Steiner", label: "Lana Steiner" },
          { value: "Demi Wilkinson", label: "Demi Wilkinson" },
          { value: "Candice Wu", label: "Candice Wu" },
          { value: "Natali Craig", label: "Natali Craig" },
          { value: "Drew Cano", label: "Drew Cano" },
        ]}
        // menuIsOpen={true}
      />
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
