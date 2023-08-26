"use client"

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { LoadingDots } from "@/components/shared/icons";
import useSWR from "swr";
import { mutate } from "swr";
import { fetcher } from "@/lib/utils";
import { UserProps } from "@/lib/types";

export default function Username() {

  const { data: user, error } = useSWR<UserProps>("/api/users", fetcher);
  const username = user?.username;

  const [newName, setNewName] = useState("");
  useEffect(() => {
    setNewName(username!);
  }, [username]);

  const [saving, setSaving] = useState(false);
  const saveDisabled = useMemo(() => {
    return saving || !newName || newName === username;
  }, [saving, newName, username]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaving(true);
        fetch(`/api/users`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: newName,
          }),
        }).then(async (res) => {
          setSaving(false);
          if (res.status === 200) {
            mutate("/api/projects/namespace");
            toast.success("Successfully updated username");
          } else {
            const error = await res.json();
            toast.error(JSON.stringify(error));
          }
        });
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="relative flex flex-col space-y-3 p-5 sm:p-10">
        <h2 className="text-xl font-medium">Username</h2>
        <div className="flex items-center space-x-1">
          <p className="text-sm text-gray-500">This is your URL namespace .</p>
        </div>
        <div />
        {username ? (
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Flexstart"
            required
            value={newName}
            onChange={(e) =>
              setNewName(
                e.target.value
                  .toLowerCase()
                  .trim()
                  .replace(/[\W_]+/g, "-")
              )
            }
            className="w-full max-w-md rounded-md border border-gray-300 text-sm text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500"
          />
        ) : (
          <div className="h-[2.35rem] w-full max-w-md animate-pulse rounded-md bg-gray-200" />
        )}
      </div>

      <div className="border-b border-gray-200" />

      <div className="px-5 py-4 sm:flex sm:items-center sm:justify-end sm:px-10">
        <button
          disabled={saveDisabled}
          className={`${
            saveDisabled
              ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
              : "border-black bg-black text-white hover:bg-white hover:text-black"
          } h-9 w-full rounded-md border text-sm transition-all duration-150 ease-in-out focus:outline-none sm:w-32`}
        >
          {saving ? <LoadingDots /> : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
