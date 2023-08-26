"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import Modal from "@/components/shared/modal";
import Pricing from "./pricing";

function UpgradePlanModal({
  showUpgradePlanModal,
  setShowUpgradePlanModal,
  welcomeFlow,
}: {
  showUpgradePlanModal: boolean;
  setShowUpgradePlanModal: Dispatch<SetStateAction<boolean>>;
  welcomeFlow?: boolean;
}) {
  return (
    <Modal
      showModal={showUpgradePlanModal}
      setShowModal={setShowUpgradePlanModal}
      closeWithX={welcomeFlow}
    >
      <div className="inline-block max-h-[calc(100vh-150px)] w-full max-w-screen-xl transform overflow-scroll bg-white align-middle shadow-xl scrollbar-hide sm:rounded-2xl sm:border sm:border-gray-200">
        <Pricing />
      </div>
    </Modal>
  );
}

export function useUpgradePlanModal({
  welcomeFlow,
}: { welcomeFlow?: boolean } = {}) {
  const [showUpgradePlanModal, setShowUpgradePlanModal] = useState(false);

  const UpgradePlanModalCallback = useCallback(() => {
    return (
      <UpgradePlanModal
        showUpgradePlanModal={showUpgradePlanModal}
        setShowUpgradePlanModal={setShowUpgradePlanModal}
        welcomeFlow={welcomeFlow}
      />
    );
  }, [showUpgradePlanModal, setShowUpgradePlanModal, welcomeFlow]);

  return useMemo(
    () => ({
      setShowUpgradePlanModal,
      UpgradePlanModal: UpgradePlanModalCallback,
    }),
    [setShowUpgradePlanModal, UpgradePlanModalCallback]
  );
}
