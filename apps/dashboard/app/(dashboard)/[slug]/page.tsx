"use client";

import ErrorPage from "next/error";
import { useState, useEffect, useMemo, FormEvent } from "react";
import useSWR, { mutate } from "swr";
import { useDebounce } from "use-debounce";
import useProject from "@/lib/swr/use-project";
// import LinksContainer from "@/components/dashboard/links/links-container";
// import { useAddEditLinkModal } from "@/components/dashboard/modals/add-edit-link-modal";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { useAcceptInviteModal } from "@/components/dashboard/modals/accept-invite-modal";
import LinkFilters from "@/components/dashboard/links/link-filters";
import { useCompleteSetupModal } from "@/components/dashboard/modals/complete-setup-modal";
import Tooltip from "@/components/shared/tooltip";
import {
  LoadingDots,
  QuestionCircle,
  ExternalLink,
} from "@/components/shared/icons";
import { ProjectProps, UserProps } from "@/lib/types";
import { fetcher } from "@/lib/utils";

export default function Projects({ params }: { params: { slug: string } }) {
  const { project, error } = useProject();
  const { data: user } = useSWR<UserProps>("/api/usage", fetcher);

  const [podError, setPodError] = useState("");
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState({
    image: project?.image,
    port: project?.port,
    replicas: project?.replicas!,
  });
  const { image, port, replicas } = data;
  const name = project?.name;
  const availPod = user?.usageLimit! - user?.usage!;

  const [debouncedPod] = useDebounce(replicas, 1);
  useEffect(() => {
    if (replicas != project?.replicas) {
      setPodError(
        replicas > availPod
          ? `${availPod} pod available. Upgrade for more`
          : replicas <= 0
          ? `value should be greater than zero`
          : ""
      );
    } else {
      setPodError("");
    }
  }, [debouncedPod, podError, replicas]);

  const saveDisabled = useMemo(() => {
    /* 
      Disable save if:
      - saving is in progress
      - pod is invalid
      - for an existing project, there's no changes
    */
    if (saving || podError) {
      return true;
    } else {
      return false;
    }
  }, [saving, podError, project]);

  // const { AddEditLinkModal, AddEditLinkButton } = useAddEditLinkModal({});
  const { AcceptInviteModal, setShowAcceptInviteModal } =
    useAcceptInviteModal();
  const { CompleteSetupModal, setShowCompleteSetupModal } =
    useCompleteSetupModal();

  // handle errors
  useEffect(() => {
    if (error && (error.status === 409 || error.status === 410)) {
      setShowAcceptInviteModal(true);
    } else if (project && !project.domainVerified) {
      setShowCompleteSetupModal(true);
    }
  }, [setShowAcceptInviteModal, setShowCompleteSetupModal, error, project]);

  if (error && error.status === 404) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {/* {project && <AddEditLinkModal />} */}
      {/* {!project?.domainVerified && <CompleteSetupModal />} */}
      {error && (error.status === 409 || error.status === 410) && (
        <AcceptInviteModal />
      )}
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium">{project?.name}</h1>
            <button
              onClick={async () => {
                fetch(`/api/projects/${name}`, {
                  method: "PATCH",
                });
              }}
              className="rounded-md border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95"
            >
              Restart
            </button>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="pb-10 pt-10">
        <div className="rounded-lg border border-gray-200 bg-white">
          <form
            onSubmit={async (e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              setSaving(true);
              fetch(`/api/projects/${name}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }).then(async (res) => {
                setSaving(false);
                if (res.status === 200) {
                  mutate(`/api/projects`);
                }
              });
            }}
          >
            <div className="flex space-y-3 p-10">
              <div className="w-60 h-45 mr-10">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://${project?.domain}`}
                  className="rounded border border-black"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                ></iframe>
              </div>
              {project ? (
                <a
                  href={`https://${project?.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2"
                >
                  <p className="flex items-center text-xl font-semibold">
                    {project?.domain}
                  </p>
                  <ExternalLink className="h-5 w-5" />
                </a>
              ) : (
                <div className="h-8 w-32 animate-pulse rounded-md bg-gray-200" />
              )}

              {/* <p className="text-sm text-gray-500"></p> */}
            </div>
            <div className="border-b border-gray-200" />
            <div className="grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
              <div className="flex flex-col space-y-2 p-10">
                <div className="flex items-center">
                  <h3 className="font-medium">Image</h3>
                  <Tooltip content="Container Image">
                    <div className="flex h-4 w-8 justify-center">
                      <QuestionCircle className="h-4 w-4 text-gray-600" />
                    </div>
                  </Tooltip>
                </div>
                <div className="relative mt-1 flex rounded-md shadow-sm">
                  <input
                    name="image"
                    id="image"
                    type="text"
                    required
                    className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                    placeholder={project?.image}
                    defaultValue={image || project?.image}
                    onChange={(e) => {
                      setData({ ...data, image: e.target.value });
                    }}
                    aria-invalid="true"
                  />
                </div>
              </div>
              <div className="p-10">
                <h3 className="font-medium">No. of Pods</h3>
                <div className="relative mt-1 flex rounded-md shadow-sm">
                  <input
                    name="replicas"
                    id="replicas"
                    type="number"
                    min={1}
                    max={availPod + project?.replicas!}
                    required
                    className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                    placeholder={String(project?.replicas)}
                    defaultValue={replicas || project?.replicas}
                    onChange={(e) => {
                      setData({ ...data, replicas: Number(e.target.value) });
                    }}
                  />
                </div>
                {podError && (
                  <p className="mt-2 text-sm text-red-600" id="slug-error">
                    {podError}
                  </p>
                )}
              </div>
            </div>
            <div className="border-b border-gray-200" />
            <div className="flex flex-col items-center justify-between space-y-3 px-10 py-4 text-center sm:flex-row sm:space-y-0 sm:text-left">
              <p className="text-sm text-gray-500">
                changes will only take effect after you save your changes.
              </p>
              <button
                disabled={saveDisabled}
                className={`${
                  saveDisabled
                    ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                    : "border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-blue-500"
                } h-9 w-20 duration-150 ease-in-out rounded border text-sm transition-all focus:outline-none`}
              >
                {saving ? <LoadingDots color="#808080" /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
