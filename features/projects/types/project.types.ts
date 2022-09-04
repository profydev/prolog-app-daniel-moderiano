export enum ProjectLanguage {
  react = "react",
  node = "node",
  python = "python",
}

export enum ProjectStatus {
  info = "info",
  error = "error",
  warning = "warning",
}

export type Project = {
  id: string;
  name: string;
  language: ProjectLanguage;
  numIssues: number;
  numEvents24h: number;
  status: ProjectStatus;
};
