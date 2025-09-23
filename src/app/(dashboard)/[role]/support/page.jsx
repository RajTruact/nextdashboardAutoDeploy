"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SupportCard from "./SupportCard";

export default function Support() {
  const pathname = usePathname();
  const role = pathname.split("/")[1];
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 overflow-auto">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7 capitalize">
          Support Page {role}
        </h3>
        <div className="space-y-6">
          <SupportCard />
        </div>
      </div>
    </div>
  );
}
