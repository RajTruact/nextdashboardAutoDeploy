"use client";
import React, { useState } from "react";
import { useModal } from "@/src/hooks/useModaol";
import { Modal } from "@/src/components/ui/modal";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";
import { MailIcon } from "lucide-react";

export default function UserEmailCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [step, setStep] = useState(1); // 1 = verify, 2 = enter new email, 3 = verify OTP
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    // Call API to verify current email + password
    console.log("Verifying identity...");
    // On success:
    setStep(2);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Call API to send OTP to the new email
    console.log("Sending OTP to:", newEmail);
    // On success:
    setStep(3);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Call API to verify OTP
    console.log("Verifying OTP:", otp);
    // On success:
    closeModal();
    setStep(1); // reset flow for next open
    setNewEmail("");
    setOtp("");
    // Show success message
  };

  const handleCancel = () => {
    closeModal();
    setStep(1);
    setNewEmail("");
    setOtp("");
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Email
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Change your email address linked to this account.
            </p>
            <p className="mt-2 text-sm font-medium text-gray-800 dark:text-white/90">
              Jayantkumar@gmail.com
            </p>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <MailIcon className="w-5 h-5" />
            Change Email
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleCancel} className="max-w-[600px] m-4">
        <div className="relative w-full p-4 bg-white rounded-3xl dark:bg-gray-900 lg:p-10">
          {step === 1 ? (
            // Step 1: Verify identity with password
            <>
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Verify Identity
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                Enter your current email and password to continue.
              </p>
              <form className="flex flex-col gap-5" onSubmit={handleVerify}>
                <div>
                  <Label>Current Email</Label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="flex items-center gap-3 mt-6 lg:justify-end">
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button size="sm" type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </>
          ) : step === 2 ? (
            // Step 2: Enter new email address
            <>
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Update Email
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                Enter your new email address. We'll send a verification code to this email.
              </p>
              <form className="flex flex-col gap-5" onSubmit={handleSendOtp}>
                <div>
                  <Label>New Email</Label>
                  <Input 
                    type="email" 
                    placeholder="Enter new email" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required 
                  />
                </div>
                <div>
                  <Label>Confirm New Email</Label>
                  <Input
                    type="email"
                    placeholder="Re-enter new email"
                    required
                  />
                </div>
                <div className="flex items-center gap-3 mt-6 lg:justify-end">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button size="sm" type="submit">
                    Send Verification Code
                  </Button>
                </div>
              </form>
            </>
          ) : (
            // Step 3: Verify OTP sent to new email
            <>
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Verify New Email
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                Enter the verification code sent to {newEmail}.
              </p>
              <form className="flex flex-col gap-5" onSubmit={handleVerifyOtp}>
                <div>
                  <Label>Verification Code</Label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Resend Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Change Email
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-6 lg:justify-end">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button size="sm" type="submit">
                    Verify & Update
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}