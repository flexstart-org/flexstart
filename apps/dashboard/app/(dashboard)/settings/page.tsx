"use client"

import Username from "@/components/dashboard/settings/username";
import UserNamespace from "@/components/dashboard/settings/user-namespace";
import DeleteAccount from "@/components/dashboard/settings/delete-account";

export default function AccountSettingsGeneral() {
  return (
    <>
      <Username />
      <UserNamespace />
      <DeleteAccount />
    </>
  );
}