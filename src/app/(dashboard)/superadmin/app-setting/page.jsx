"use client";
import React from "react";
import { usePathname } from "next/navigation";
import AppSettingCard from "./AppSettings";
import ThemeCustomizationPage from "./ThemeSetting";
import ColorPicker from "./ColorPicker";

export default function AppSetting() {
  const pathname = usePathname();
  const role = pathname.split("/")[1];
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 overflow-auto">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7 capitalize">
          App Settings {role}
        </h3>
        <div className="space-y-6">
          <AppSettingCard />
        </div>
        <div className="space-y-6">
          <ThemeCustomizationPage />
        </div>
        {/* <div className="space-y-6">
          <ColorPicker default_value="#acff47" />
        </div> */}
      </div>
    </div>
  );
}
