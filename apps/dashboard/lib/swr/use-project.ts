"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { ProjectProps } from "@/lib/types";
import { fetcher } from "@/lib/utils";

export default function useProject() {
  const { slug } = useParams() as { slug: string };

  const { data: project, error } = useSWR<ProjectProps>(
    slug && `/api/projects/${slug}`,
    fetcher,
    {
      dedupingInterval: 30000,
    },
  );

  const isOwner = useMemo(() => {
    if (project && Array.isArray(project.users)) {
      return project.users[0].role === "owner";
    }
  }, [project]);

  return {
    project,
    isOwner,
    error,
    loading: slug && !project && !error,
  };
}
