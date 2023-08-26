"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR, { mutate } from "swr";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import { X } from "lucide-react";
import { AlertCircleFill, LoadingDots } from "@/components/shared/icons";
import Modal from "@/components/shared/modal";
import { SecretProps, UserProps } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import Switch from "@/components/shared/switch";

function AddProjectModalHelper({
  showAddProjectModal,
  setShowAddProjectModal,
  welcomeFlow,
}: {
  showAddProjectModal: boolean;
  setShowAddProjectModal: Dispatch<SetStateAction<boolean>>;
  welcomeFlow?: boolean;
}) {
  const router = useRouter();
  const { data: user } = useSWR<UserProps>("/api/usage", fetcher);
  const { data: secrets } = useSWR<SecretProps[]>("/api/secrets", fetcher);

  const [slugError, setSlugError] = useState("");
  const [podError, setPodError] = useState("");
  const [saving, setSaving] = useState(false);
  const [pullSecret, setPullSecret] = useState(true);

  const [data, setData] = useState<{
    name: string;
    image: string;
    port: string;
    arch: string;
    replicas: string;
    secret: string;
  }>({
    name: "",
    image: "",
    port: "",
    arch: "",
    replicas: "",
    secret: "",
  });
  const { name, image, port, arch, replicas, secret } = data;

  const [debouncedSlug] = useDebounce(name, 100);
  useEffect(() => {
    if (debouncedSlug.length > 0) {
      fetch(`/api/projects/${name}/exists`).then(async (res) => {
        if (res.status === 200) {
          const exists = await res.json();
          if (exists == 1) {
            setSlugError("Name is already in use.");
            setSaving(true);
          }
        }
      });
    } else {
      setSlugError("");
      setSaving(false);
    }
  }, [debouncedSlug, slugError, name]);

  const [debouncedPod] = useDebounce(replicas, 1);
  useEffect(() => {
    if (debouncedPod.length > 0) {
      const availPod = `${user?.usageLimit! - user?.usage!}`;
      if (replicas > availPod) {
        setPodError(`${availPod} pod available. Upgrade for more`);
        setSaving(true);
      } else if (replicas <= "0") {
        setPodError("value should be greater than zero");
        setSaving(true);
      }
    } else {
      setPodError("");
      setSaving(false);
    }
  }, [debouncedPod, podError, replicas]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      name: name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [name]);

  return (
    <Modal
      showModal={showAddProjectModal}
      setShowModal={setShowAddProjectModal}
      closeWithX={welcomeFlow}
    >
      <div className="inline-block w-full transform overflow-hidden bg-white align-middle shadow-xl transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200">
        <div className="flex relative items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 sm:px-16">
          <h3 className="text-lg font-medium">Create new Project</h3>
          <span className="mt-4 mr-5 absolute top-0 right-0">
            <button
              onClick={() => {
                setShowAddProjectModal(false);
              }}
            >
              <X className="w-6 h-6" />
            </button>
          </span>
        </div>

        <form
          onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setSaving(true);
            fetch(`/api/projects`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then(async (res) => {
              if (res.status === 200) {
                mutate(`/api/projects`);
                toast.success(`Project "${name}" created successfully.`);
                if (welcomeFlow) {
                  router.push("/welcome?type=upgrade");
                } else {
                  router.push(`/${name}`);
                  setShowAddProjectModal(false);
                }
              } else {
                toast.error(res.statusText);
              }
              setSaving(false);
            });
          }}
          className="flex flex-col space-y-6 bg-gray-50 px-4 py-8 text-left sm:px-16"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                name="name"
                id="name"
                type="text"
                required
                className={`${
                  slugError
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"
                } block w-full rounded-md focus:outline-none sm:text-sm`}
                placeholder="name"
                value={name}
                onChange={(e) => {
                  setSlugError("");
                  setData({ ...data, name: e.target.value });
                }}
                aria-invalid="true"
              />
              {/* {slugError && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <AlertCircleFill
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </div>
              )} */}
            </div>
            {slugError && (
              <p className="mt-2 text-sm text-red-600" id="slug-error">
                {slugError}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Container Image Link
            </label>
            <div className="relative mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-2 text-gray-500 sm:text-sm">
                https://
              </span>
              <input
                name="image"
                id="image"
                type="text"
                required
                className="block w-full rounded-r-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="image"
                value={image}
                onChange={(e) => {
                  setData({ ...data, image: e.target.value });
                }}
                aria-invalid="true"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="port"
              className="block text-sm font-medium text-gray-700"
            >
              Container Port
            </label>
            <div className="relative mt-1 flex rounded-md shadow-sm">
              <input
                name="port"
                id="port"
                type="number"
                required
                // pattern="[a-zA-Z0-9\-.]+"
                className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="80"
                value={port}
                onChange={(e) => {
                  setData({ ...data, port: e.target.value });
                }}
                aria-invalid="true"
              />
            </div>
          </div>

          <div className="flex">
            <div>
              <label
                htmlFor="arch"
                className="block text-sm font-medium text-gray-700"
              >
                OS/ARCH
              </label>
              <select
                name="arch"
                id="arch"
                className="block mt-1 rounded-md text-sm"
                value={arch}
                onChange={(e) => {
                  setData({
                    ...data,
                    arch: e.target.value,
                  });
                }}
              >
                <option value="amd64">amd64</option>
                <option value="arm64">arm64</option>
              </select>
            </div>
            <div className="ml-16">
              <label
                htmlFor="replicas"
                className="block text-sm font-medium text-gray-700"
              >
                No. of Pods
              </label>
              <div className="relative mt-1 flex rounded-md shadow-sm">
                <input
                  name="replicas"
                  id="replicas"
                  type="number"
                  placeholder="1"
                  className="block w-24 rounded-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                  required
                  value={replicas}
                  onChange={(e) => {
                    setData({ ...data, replicas: e.target.value });
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

          <div className="block text-sm font-medium text-gray-700">
            <label className="mr-2">Private Image? :</label>
            <span>No </span>
            <Switch fn={setPullSecret} checked={pullSecret}></Switch>
            <span> Yes</span>
          </div>

          {pullSecret === true ? (
            <div>
              <label
                htmlFor="secret"
                className="text-sm font-medium text-gray-700"
              >
                Image Pull Secret :{" "}
              </label>
              {secrets?.length! > 0 ? (
                <>
                  <select
                    name="secret"
                    id="secret"
                    className="rounded-md text-sm"
                    value={secret}
                    onChange={(e) => {
                      setData({
                        ...data,
                        secret: e.target.value,
                      });
                    }}
                  >
                    <option hidden>Select</option>
                    {secrets?.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <Link
                    href="/secrets"
                    className="text-blue-700 underline text-sm ml-2"
                  >
                    add new
                  </Link>
                </>
              ) : (
                <Link
                  href="/secrets"
                  className="text-blue-700 underline text-sm ml-2"
                >
                  Create New Secret
                </Link>
              )}
            </div>
          ) : null}

          <button
            disabled={saving}
            className={`${
              saving || slugError || podError
                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                : "border-black bg-black text-white hover:bg-white hover:text-black"
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            {saving ? <LoadingDots color="#808080" /> : <p>Create project</p>}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export function useAddProjectModal({
  welcomeFlow,
}: { welcomeFlow?: boolean } = {}) {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const AddProjectModal = useCallback(() => {
    return (
      <AddProjectModalHelper
        showAddProjectModal={showAddProjectModal}
        setShowAddProjectModal={setShowAddProjectModal}
        welcomeFlow={welcomeFlow}
      />
    );
  }, [showAddProjectModal, setShowAddProjectModal, welcomeFlow]);

  return useMemo(
    () => ({ setShowAddProjectModal, AddProjectModal }),
    [setShowAddProjectModal, AddProjectModal]
  );
}
