"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Meta from "@/components/layout/meta";
import Background from "@/components/shared/background";
import Intro from "@/components/dashboard/welcome/intro";
import Interim from "@/components/dashboard/welcome/interim";
import { ChevronRight } from "@/components/shared/icons";
import { useAddProjectModal } from "@/components/dashboard/modals/add-project-modal";
import { useAddSecretModal } from "@/components/dashboard/modals/add-secret-modal";
import { useUpgradePlanModal } from "@/components/dashboard/modals/upgrade-plan-modal";

export default function Welcome({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const { setShowAddProjectModal, AddProjectModal } = useAddProjectModal({
    welcomeFlow: true,
  });
  const { setShowAddSecretModal, AddSecretModal } = useAddSecretModal({
    welcomeFlow: true,
  });
  const { setShowUpgradePlanModal, UpgradePlanModal } = useUpgradePlanModal({
    welcomeFlow: true,
  });

  const { data: session } = useSession();
  const router = useRouter();

  if (!session && typeof session != "undefined") {
    router.push(`/login`);
  }

  useEffect(() => {
    if (searchParams.type === "project") {
      setTimeout(() => {
        setShowAddProjectModal(true);
      }, 200);
    } else {
      setShowAddProjectModal(false);
    }
    if (searchParams.type === "secret") {
      setTimeout(() => {
        setShowAddSecretModal(true);
      }, 200);
    } else {
      setShowAddSecretModal(false);
    }
    if (searchParams.type === "upgrade") {
      setTimeout(() => {
        setShowUpgradePlanModal(true);
      }, 200);
    } else {
      setShowUpgradePlanModal(false);
    }
  }, [searchParams.type]);

  return (
    <div className="flex h-screen flex-col items-center">
      <Meta title="Welcome to Flexstart" />
      <Background />
      <AddProjectModal />
      <AddSecretModal />
      <UpgradePlanModal />
      <AnimatePresence mode="wait">
        {searchParams.type ? (
          <button
            className="group absolute left-10 top-10 z-40 rounded-full p-2 transition-all hover:bg-gray-100"
            onClick={() => router.back()}
          >
            <ArrowLeft
              size={20}
              className="text-gray-500 group-hover:text-gray-700 group-active:scale-90"
            />
          </button>
        ) : (
          <Intro key="intro" />
        )}
        {searchParams.type === "interim" && <Interim key="interim" />}
      </AnimatePresence>
      <div className="my-10">
        <Link href="/dashboard" className="flex">
          Skip to Dashboard <ChevronRight />
        </Link>
      </div>
    </div>
  );
}
