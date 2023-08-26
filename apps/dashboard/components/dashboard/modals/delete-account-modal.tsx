"use client"

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { signOut } from "next-auth/react";
import { mutate } from "swr";
import { toast } from "sonner";
import LoadingDots from "@/components/shared/icons/loading-dots";
import Modal from "@/components/shared/modal";

function DeleteAccountModal({
  showDeleteAccountModal,
  setShowDeleteAccountModal,
}: {
  showDeleteAccountModal: boolean;
  setShowDeleteAccountModal: Dispatch<SetStateAction<boolean>>;
}) {

  const [deleting, setDeleting] = useState(false);

  return (
    <Modal
      showModal={showDeleteAccountModal}
      setShowModal={setShowDeleteAccountModal}
    >
      <div className="inline-block w-full transform overflow-hidden bg-white align-middle shadow-xl transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-12">
          <h3 className="text-lg font-medium">Delete Account</h3>
          <p className="text-center text-sm text-gray-500">
            Warning: This will permanently delete your account and all other
            resources within this account.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setDeleting(true);
            fetch(`/api/users`, { method: "DELETE" }).then(async (res) => {
              setDeleting(false);
              if (res.status === 200) {
                mutate("/api/users");
                setShowDeleteAccountModal(false);
                toast.success(`Account deleted successfully.`);
                signOut();
              } else {
                toast.error(res.statusText);
              }
            });
          }}
          className="flex flex-col space-y-6 bg-gray-50 px-4 py-8 text-left sm:px-16"
        >
          <div>
            <label
              htmlFor="verification"
              className="block text-sm text-gray-700"
            >
              To verify, type{" "}
              <span className="font-semibold text-black">
                confirm delete account
              </span>{" "}
              below
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                name="verification"
                id="verification"
                pattern="confirm delete account"
                required
                autoFocus={false}
                className="block w-full rounded-md border-gray-300 pr-10 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              />
            </div>
          </div>

          <button
            disabled={deleting}
            className={`${
              deleting
                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                : "border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600"
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            {deleting ? (
              <LoadingDots color="#808080" />
            ) : (
              <p>Confirm delete account</p>
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export function useDeleteAccountModal() {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const DeleteAccountModalCallback = useCallback(() => {
    return (
      <DeleteAccountModal
        showDeleteAccountModal={showDeleteAccountModal}
        setShowDeleteAccountModal={setShowDeleteAccountModal}
      />
    );
  }, [showDeleteAccountModal, setShowDeleteAccountModal]);

  return useMemo(
    () => ({
      setShowDeleteAccountModal,
      DeleteAccountModal: DeleteAccountModalCallback,
    }),
    [setShowDeleteAccountModal, DeleteAccountModalCallback]
  );
}
