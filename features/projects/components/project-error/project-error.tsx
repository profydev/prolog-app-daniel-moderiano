interface ProjectErrorProps {
  refetchProjects: () => void;
}

export const ProjectError = ({ refetchProjects }: ProjectErrorProps) => {
  return (
    <div>
      <p>There was a problem while loading the project data</p>
      <button onClick={refetchProjects}>Try again</button>
    </div>
  );
};
