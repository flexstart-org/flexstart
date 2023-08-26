"use client";

import useSWR from "swr";
import { useAddSecretModal } from "@/components/dashboard/modals/add-secret-modal";
import NoSecretsPlaceholder from "@/components/dashboard/no-secrets-placeholder";
import SecretCard from "@/components/dashboard/secret-card";
import ProjectCardPlaceholder from "@/components/dashboard/project-card-placeholder";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { fetcher } from "@/lib/utils";
import { SecretProps } from "@/lib/types";

export default function App() {
  const { data, error } = useSWR<SecretProps[]>("/api/secrets", fetcher);
  const { setShowAddSecretModal, AddSecretModal } = useAddSecretModal({});

  return (
    <>
      <AddSecretModal />
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-gray-600">Secrets</h1>
            <button
              onClick={() => setShowAddSecretModal(true)}
              className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95"
            >
              Add
            </button>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <div
          className={`my-10 grid grid-cols-1 ${
            data?.length === 0 ? "" : "lg:grid-cols-3"
          } gap-5`}
        >
          {data ? (
            data.length > 0 ? (
              data.map((d) => <SecretCard key={d.name} {...d} />)
            ) : (
              <NoSecretsPlaceholder
                setShowAddSecretModal={setShowAddSecretModal}
              />
            )
          ) : (
            Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardPlaceholder key={i} />
            ))
          )}
        </div>
      </MaxWidthWrapper>
    </>
  );
}
