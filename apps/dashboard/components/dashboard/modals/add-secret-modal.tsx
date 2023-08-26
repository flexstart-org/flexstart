"use client";

import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { mutate } from "swr";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { AlertCircleFill, LoadingDots } from "@/components/shared/icons";
import Modal from "@/components/shared/modal";
import { X } from "lucide-react";

function AddSecretModalHelper({
  showAddSecretModal,
  setShowAddSecretModal,
  welcomeFlow,
}: {
  showAddSecretModal: boolean;
  setShowAddSecretModal: Dispatch<SetStateAction<boolean>>;
  welcomeFlow?: boolean;
}) {
  const router = useRouter();
  const [nameError, setNameError] = useState("");
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState<{
    name: string;
    server: string;
    username: string;
    password: string;
  }>({
    name: "",
    server: "",
    username: "",
    password: "",
  });
  const { name, server, username, password } = data;

  const [debouncedName] = useDebounce(name, 100);
  useEffect(() => {
    if (debouncedName.length > 0) {
      fetch(`/api/secrets?name=${name}`).then(async (res) => {
        if (res.status === 200) {
          const exists = await res.json();
          if (exists === 1) {
            setNameError("Name is already in use.");
            setSaving(true);
          }
        }
      });
    } else {
      setNameError("");
      setSaving(false);
    }
  }, [debouncedName, nameError, name]);

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
      showModal={showAddSecretModal}
      setShowModal={setShowAddSecretModal}
      closeWithX={welcomeFlow}
    >
      <div className="inline-block w-full transform overflow-hidden bg-white align-middle shadow-xl transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200">
        <div className="flex relative items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 sm:px-16">
          <h3 className="text-lg font-medium">Add a new image pull secret</h3>
          <span className="mt-4 mr-5 absolute top-0 right-0">
            <button
              onClick={() => {
                setShowAddSecretModal(false);
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
            const cred = Buffer.from(`${username}:${password}`).toString(
              "base64"
            );
            const auth = Buffer.from(
              `{"auths":{"${server}":{"auth":"${cred}"}}}`
            ).toString("base64");
            fetch(`/api/secrets`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, auth }),
            }).then(async (res) => {
              if (res.status === 200) {
                mutate(`/api/secrets`);
                toast.success(
                  `Secret "${name}" created, attach this secret to a project.`
                );
                if (welcomeFlow) {
                  router.push("/welcome?type=project");
                } else {
                  setShowAddSecretModal(false);
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
              Name
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                name="name"
                id="name"
                type="text"
                required
                pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*"
                className={`${
                  nameError
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"
                } block w-full rounded-md focus:outline-none sm:text-sm`}
                placeholder="any name of your choice"
                value={name}
                onChange={(e) => {
                  setNameError("");
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
            {nameError && (
              <p className="mt-2 text-sm text-red-600" id="slug-error">
                {nameError}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Registry Server URL
            </label>
            <div className="relative mt-1 flex rounded-md shadow-sm">
              {/* <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-5 text-gray-500 sm:text-sm">
                https://
              </span> */}
              <input
                name="image"
                id="image"
                type="text"
                required
                className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="eg:- https://index.docker.io/v1/"
                value={server}
                onChange={(e) => {
                  setData({ ...data, server: e.target.value });
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
              Username
            </label>
            <div className="relative mt-1 flex rounded-md shadow-sm">
              <input
                name="port"
                id="port"
                type="text"
                required
                pattern="[a-zA-Z0-9\-.]+"
                className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="username"
                value={username}
                onChange={(e) => {
                  setData({ ...data, username: e.target.value });
                }}
                aria-invalid="true"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="replicas"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1 flex rounded-md shadow-sm">
              <input
                name="replicas"
                id="replicas"
                type="text"
                required
                className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
            </div>
          </div>

          <button
            disabled={saving}
            className={`${
              saving || nameError
                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                : "border-black bg-black text-white hover:bg-white hover:text-black"
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            {saving ? <LoadingDots color="#808080" /> : <p>Add secret</p>}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export function useAddSecretModal({
  welcomeFlow,
}: { welcomeFlow?: boolean } = {}) {
  const [showAddSecretModal, setShowAddSecretModal] = useState(false);

  const AddSecretModal = useCallback(() => {
    return (
      <AddSecretModalHelper
        showAddSecretModal={showAddSecretModal}
        setShowAddSecretModal={setShowAddSecretModal}
        welcomeFlow={welcomeFlow}
      />
    );
  }, [showAddSecretModal, setShowAddSecretModal, welcomeFlow]);

  return useMemo(
    () => ({ setShowAddSecretModal, AddSecretModal }),
    [setShowAddSecretModal, AddSecretModal]
  );
}
