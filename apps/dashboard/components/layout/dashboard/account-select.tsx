"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import PlanBadge from "@/components/dashboard/settings/plan-badge";
import BlurImage from "@/components/shared/blur-image";
import { ChevronsUpDown, PlusCircle } from "lucide-react";
import { Tick } from "@/components/shared/icons";
import Popover from "@/components/shared/popover";
import { useAddProjectModal } from "@/components/dashboard/modals/add-project-modal";
import { ProjectProps, Session } from "@/lib/types";
import { GOOGLE_FAVICON_URL } from "@/lib/constants";

export default function AccountSelect({ session, pname, plan }) {
  const [openPopover, setOpenPopover] = useState(false);
  const { AddProjectModal, setShowAddProjectModal } = useAddProjectModal({});

  const { data: projects } = useSWR<ProjectProps[]>("/api/projects", fetcher, {
    dedupingInterval: 30000,
  });

  const selected = useMemo(() => {
    if (pname && projects) {
      const selectedProject = projects.find(
        (project) => project.name === pname
      );
      return {
        ...selectedProject,
        image:
          selectedProject?.logo ||
          `${GOOGLE_FAVICON_URL}${selectedProject?.domain}`,
      };
    } else {
      return {
        name: session?.user?.name || session?.user?.email,
        image:
          session?.user?.image ||
          `https://avatars.dicebear.com/api/micah/${session?.user?.email}.svg`,
      };
    }
  }, [pname, projects, session]) as {
    id?: string;
    name: string;
    image: string;
  };

  if (!session)
    return (
      <div className="flex animate-pulse items-center justify-end space-x-1.5 rounded-lg px-1.5 py-2 sm:w-60">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        <div className="hidden h-8 w-28 animate-pulse rounded-md bg-gray-200 sm:block sm:w-40" />
        <ChevronsUpDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
      </div>
    );

  return (
    <div>
      <AddProjectModal />
      <Popover
        content={
          <ProjectList
            selected={selected}
            session={session}
            // @ts-ignore
            projects={projects}
            setShowAddProjectModal={setShowAddProjectModal}
          />
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex items-center justify-between rounded-lg bg-white p-1.5 text-left text-sm transition-all duration-75 hover:bg-gray-100 focus:outline-none active:bg-gray-200"
        >
          <div className="flex items-center space-x-3 pr-2">
            <BlurImage
              src={selected.image}
              alt={selected.id || selected.name}
              className="h-8 w-8 flex-none overflow-hidden rounded-full"
              width={48}
              height={48}
            />
            <div className={`flex items-center space-x-3 sm:flex`}>
              <span className="inline-block max-w-[100px] truncate text-sm font-medium sm:max-w-[200px]">
                {selected.name}
              </span>
              {plan ? <PlanBadge plan={plan} /> : null}
            </div>
          </div>
          <ChevronsUpDown
            className="h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </Popover>
    </div>
  );
}

function ProjectList({
  selected,
  session,
  projects,
  setShowAddProjectModal,
}: {
  selected: {
    name: string;
    image: string;
  };
  session: Session;
  projects: ProjectProps[];
  setShowAddProjectModal: (show: boolean) => void;
}) {
  return (
    <div className="relative mt-1 max-h-72 w-full space-y-0.5 overflow-auto rounded-md bg-white p-2 text-base sm:w-60 sm:text-sm sm:shadow-lg">
      <div className="p-2 text-xs text-gray-500">Personal Account</div>
      <Link
        key="personal"
        className={`relative flex w-full items-center space-x-2 rounded-md px-2 py-1.5 hover:bg-gray-100 active:bg-gray-200 ${
          selected.name ? "font-medium" : ""
        } transition-all duration-75`}
        href="/"
      >
        <BlurImage
          src={
            session.user.image ||
            `https://avatars.dicebear.com/api/micah/${session.user.email}.svg`
          }
          alt={session.user.name || session.user.email || "Personal Account"}
          className="h-7 w-7 flex-none overflow-hidden rounded-full"
          width={48}
          height={48}
        />
        <span
          className={`block truncate pr-8 text-sm ${
            selected.name ? "font-medium" : "font-normal"
          }`}
        >
          {session.user.name || session.user.email}
        </span>
        {selected.name === (session.user.name || session.user.email) ? (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-black">
            <Tick className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </Link>
      <div className="p-2 text-xs text-gray-500">Projects</div>
      {projects.map(({ id, name, logo, domain }) => (
        <Link
          key={name}
          className={`relative flex w-full items-center space-x-2 rounded-md px-2 py-1.5 hover:bg-gray-100 active:bg-gray-200 ${
            selected.name === name ? "font-medium" : ""
          } transition-all duration-75`}
          href={`/${name}`}
        >
          <BlurImage
            src={logo || `${GOOGLE_FAVICON_URL}${domain}`}
            alt={id}
            className="h-7 w-7 overflow-hidden rounded-full"
            width={48}
            height={48}
          />
          <span
            className={`block truncate text-sm ${
              selected.name === name ? "font-medium" : "font-normal"
            }`}
          >
            {name}
          </span>
          {selected.name === name ? (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-black">
              <Tick className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </Link>
      ))}
      <button
        key="add"
        onClick={() => setShowAddProjectModal(true)}
        className="flex w-full cursor-pointer items-center space-x-2 rounded-md p-2 transition-all duration-75 hover:bg-gray-100"
      >
        <PlusCircle className="h-6 w-6 text-gray-500" />
        <span className="block truncate">Add a new project</span>
      </button>
    </div>
  );
}
