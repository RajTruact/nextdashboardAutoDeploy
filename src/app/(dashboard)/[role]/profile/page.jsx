"use client";
import React from "react";
import UserMetaCard from "./UserMetaCard";
import UserPasswordCard from "./UserPasswordCard";
import UserEmailCard from "./UserEmailCard";
import { usePathname } from "next/navigation";

export default function Profile() {
  const pathname = usePathname();
  const role = pathname.split("/")[1];
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 overflow-auto">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7 capitalize">
          Update Profile {role}
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
        </div>

        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7 mt-5">
          Reset Password
        </h3>
        <div className="space-y-6">
          <UserPasswordCard />
        </div>

        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7 mt-5">
          Change Email
        </h3>
        <div className="space-y-6">
          <UserEmailCard />
        </div>
      </div>
    </div>
  );
}
