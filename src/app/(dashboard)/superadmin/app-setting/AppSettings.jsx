"use client";
import React, { useState } from "react";
import { useModal } from "@/src/hooks/useModaol";
import { Modal } from "@/src/components/ui/modal";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";

export default function AppSettingCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [appSettings, setAppSettings] = useState({
    fullName: "After Sales Support",
    shortName: "A.S.S.O",
  });

  const handleSave = () => {
    // Handle save logic here - typically would call an API
    console.log("Saving application settings:", appSettings);
    closeModal();
  };

  const handleInputChange = (field, value) => {
    setAppSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 sm:flex-row sm:items-start">
            {/* <div className="flex items-center justify-center w-20 h-20 overflow-hidden border border-gray-200 rounded-xl dark:border-gray-800 group shrink-0 bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-2xl font-bold text-white">
                {appSettings.shortName.charAt(0)}
              </span>
            </div> */}

            <div className="w-full">
              <div className="flex flex-col items-center mb-6 sm:flex-row sm:justify-between sm:items-start">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4 sm:mb-0">
                  Application Settings
                </h4>

                <button
                  onClick={openModal}
                  className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 sm:w-auto w-full max-w-[200px]"
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                      fill=""
                    />
                  </svg>
                  Edit Settings
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6">
                <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                  <p className="mb-1 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Full Application Name
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {appSettings.fullName}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                  <p className="mb-1 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Short Name
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {appSettings.shortName}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                <p className="text-xs leading-normal text-blue-600 dark:text-blue-300">
                  <span className="font-semibold">Note:</span> Changing these
                  settings will affect how your application name appears
                  throughout the system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
        <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <div className="px-2">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Application Settings
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your application name and short name.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar max-h-[60vh] overflow-y-auto px-2 pb-3">
              {/* <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center w-24 h-24 overflow-hidden border border-gray-200 rounded-xl dark:border-gray-800 bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-3xl font-bold text-white">
                    {appSettings.shortName.charAt(0)}
                  </span>
                </div>
              </div> */}

              <div className="mb-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Application Information
                </h5>

                <div className="grid grid-cols-1 gap-x-4 gap-y-5">
                  <div className="col-span-1">
                    <Label>Full Application Name</Label>
                    <Input
                      type="text"
                      value={appSettings.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-span-1">
                    <Label>Short Name</Label>
                    <Input
                      type="text"
                      value={appSettings.shortName}
                      onChange={(e) =>
                        handleInputChange("shortName", e.target.value)
                      }
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      This will be used as an abbreviation throughout the
                      application
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                  <p className="text-sm leading-normal text-blue-600 dark:text-blue-300">
                    <span className="font-semibold">Important:</span> These
                    changes will affect how your application name appears to all
                    users. The short name should be concise and recognizable.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 px-2 mt-6 sm:flex-row sm:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModal}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="w-full sm:w-auto"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
