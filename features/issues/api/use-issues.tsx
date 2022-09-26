import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import type { Page } from "@typings/page.types";
import type { Issue } from "../types/issue.types";

// * Filters defined here are NOT affecting test failures in pagination and reload

export interface Filters {
  status: string | null;
  level: string | null;
  project: string | null;
}

async function getIssues(page: number, filters: Filters) {
  const { data } = await axios.get(
    `https://prolog-api.profy.dev/issue?page=${page}${
      filters.status ? `&status=${filters.status}` : ""
    }${filters.level ? `&level=${filters.level}` : ""}${
      filters.project ? `&project=${filters.project}` : ""
    }`
  );
  return data;
}

export function useIssues(page: number, filters: Filters) {
  const query = useQuery<Page<Issue>, Error>(
    ["issues", { page, filters }],
    () => getIssues(page, filters),

    { keepPreviousData: true, staleTime: 60000 }
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(["projects", page + 1], () =>
        getIssues(page + 1, filters)
      );
    }
  }, [query.data, page, queryClient, filters]);
  return query;
}
