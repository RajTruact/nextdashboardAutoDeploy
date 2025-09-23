"use client";
import React, { useState, useRef } from "react";
import { useModal } from "@/src/hooks/useModaol";
import { Modal } from "@/src/components/ui/modal";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";
import Image from "next/image";

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [profileImage, setProfileImage] = useState(
    "https://cms.patrika.com/wp-content/uploads/2024/06/FYnsZUFXgAAhV7I.jpg"
  );
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    setIsImageModalOpen(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="p-4 sm:p-5 md:p-6 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-[#1D1F24]">
        {/* Top Row: Heading and Edit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="mb-4 sm:mb-0">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Personal Information
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Your personal details and contact information
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end">
            <button
              onClick={openModal}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
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
              Edit Profile
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center sm:text-right">
              Update your personal details
            </p>
          </div>
        </div>

        {/* Second Row: Image and Fields */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Profile Image Section */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 mt-5 overflow-hidden border-2 border-gray-300 rounded-full dark:border-gray-700 group">
              <Image
                width={160}
                height={160}
                src={profileImage}
                alt="user profile"
                className="object-cover w-full h-full cursor-pointer"
                onClick={handleImageClick}
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleImageClick}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Personal Information Fields */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  First Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Jayant
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Last Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Kumar
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  +91 8700 xxxxx 99
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Profile
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Backend Dev
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Country
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  India
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  City
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Merut
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Postal Code
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  1100001
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 sm:col-span-2 lg:col-span-1">
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  State
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Uttar Pradesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[600px] mx-4"
      >
        <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-5 sm:p-6 dark:bg-gray-900 md:p-7">
          <div className="mb-5 sm:mb-6">
            <h4 className="mb-2 text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update your details to keep your profile up-to-date.
            </p>
          </div>

          <form className="flex flex-col">
            <div className="custom-scrollbar max-h-[60vh] overflow-y-auto px-1 pb-3">
              <div className="flex justify-center mb-5 sm:mb-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden border-2 border-gray-300 rounded-full dark:border-gray-700 group">
                  <Image
                    width={96}
                    height={96}
                    src={profileImage}
                    alt="user"
                    className="object-cover w-full h-full cursor-pointer"
                    onClick={handleImageClick}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleImageClick}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mb-5 sm:mb-6">
                <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:gap-x-5 sm:gap-y-4 md:grid-cols-2">
                  <div>
                    <Label>First Name</Label>
                    <Input type="text" defaultValue="Jayant" />
                  </div>

                  <div>
                    <Label>Last Name</Label>
                    <Input type="text" defaultValue="Kumar" />
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <Input type="text" defaultValue="+91 87 xxxx 99" />
                  </div>

                  <div>
                    <Label>Profile</Label>
                    <Input type="text" defaultValue="Backend" />
                  </div>

                  <div>
                    <Label>Country</Label>
                    <Input type="text" defaultValue="India" />
                  </div>

                  <div>
                    <Label>City</Label>
                    <Input type="text" defaultValue="New Delhi" />
                  </div>

                  <div>
                    <Label>Postal Code</Label>
                    <Input type="text" defaultValue="1100001" />
                  </div>

                  <div>
                    <Label>State</Label>
                    <Input type="text" defaultValue="Uttar Pradesh" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-gray-800 sm:flex-row sm:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModal}
                className="sm:order-1"
              >
                Close
              </Button>
              <Button size="sm" onClick={handleSave} className="sm:order-2">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Image Edit Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        className="max-w-md mx-4"
      >
        <div className="no-scrollbar relative w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 dark:bg-gray-900 sm:p-6">
          <h4 className="mb-4 text-lg sm:text-xl font-semibold text-gray-800 dark:text-white/90">
            Change Profile Picture
          </h4>

          <div className="flex flex-col gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <Button onClick={triggerFileInput} className="w-full">
              Upload New Photo
            </Button>

            {profileImage !==
              "https://cms.patrika.com/wp-content/uploads/2024/06/FYnsZUFXgAAhV7I.jpg" && (
              <Button
                variant="outline"
                onClick={() => {
                  setProfileImage(
                    "https://cms.patrika.com/wp-content/uploads/2024/06/FYnsZUFXgAAhV7I.jpg"
                  );
                  setIsImageModalOpen(false);
                }}
                className="w-full"
              >
                Reset to Default
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => setIsImageModalOpen(false)}
              className="w-full mt-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
