"use client";
import React, { useState } from "react";
import { useModal } from "@/src/hooks/useModaol";
import { Modal } from "@/src/components/ui/modal";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";

export default function UserPasswordCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [step, setStep] = useState(1); // 1 = verify, 2 = OTP verification, 3 = reset
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    // Call API to verify email + password
    console.log("Verifying identity...");
    // if success:
    setStep(2);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Call API to send OTP to email
    console.log("Sending OTP to:", email);
    // if success:
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Call API to verify OTP
    console.log("Verifying OTP:", otp);
    // if success:
    setStep(3);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Call API to reset password
    console.log("Resetting password...");
    closeModal();
    setStep(1); // reset modal for next open
    setShowForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setStep(1); // Start with email input for OTP
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setStep(1);
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Security
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keep your account secure by updating your password.
            </p>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
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
                d="M9 0C4.032 0 0 4.032 0 9s4.032 9 9 9 9-4.032 9-9-4.032-9-9-9Zm0 3a6 6 0 1 1 0 12A6 6 0 0 1 9 3Zm0 2a1 1 0 0 0-1 1v3.586L6.707 11.88a1 1 0 1 0 1.414 1.415L10 10.414V6a1 1 0 0 0-1-1Z"
              />
            </svg>
            Reset Password
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
        <div className="relative w-full p-4 bg-white rounded-3xl dark:bg-gray-900 lg:p-10">
          {!showForgotPassword ? (
            // Regular password verification flow
            step === 1 ? (
              <>
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Verify Identity
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                  Enter your email and password to continue.
                </p>
                <form className="flex flex-col gap-5" onSubmit={handleVerify}>
                  <div>
                    <Label>Email</Label>
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
                  <div className="flex items-center justify-between mt-2">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-6 lg:justify-end">
                    <Button size="sm" variant="outline" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button size="sm" type="submit">
                      Continue
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              // Step 2: Reset password after verification
              <>
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Reset Password
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                  Set a new password for your account.
                </p>
                <form className="flex flex-col gap-5" onSubmit={handleSave}>
                  <div>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div>
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      placeholder="Re-enter new password"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-6 lg:justify-end">
                    <Button size="sm" variant="outline" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button size="sm" type="submit">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </>
            )
          ) : (
            // Forgot password flow with OTP
            step === 1 ? (
              // Step 1: Enter email to receive OTP
              <>
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Reset Password
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                  Enter your email to receive a verification code.
                </p>
                <form className="flex flex-col gap-5" onSubmit={handleSendOtp}>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-6 lg:justify-between">
                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Back to Login
                    </button>
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline" onClick={closeModal}>
                        Cancel
                      </Button>
                      <Button size="sm" type="submit">
                        Send Code
                      </Button>
                    </div>
                  </div>
                </form>
              </>
            ) : step === 2 ? (
              // Step 2: Enter OTP for verification
              <>
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Verify OTP
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                  Enter the verification code sent to your email.
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
                  <div className="flex items-center gap-3 mt-6 lg:justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Change Email
                    </button>
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline" onClick={closeModal}>
                        Cancel
                      </Button>
                      <Button size="sm" type="submit">
                        Verify
                      </Button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              // Step 3: Reset password after OTP verification
              <>
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Set New Password
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                  Create a new password for your account.
                </p>
                <form className="flex flex-col gap-5" onSubmit={handleSave}>
                  <div>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div>
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      placeholder="Re-enter new password"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-6 lg:justify-end">
                    <Button size="sm" variant="outline" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button size="sm" type="submit">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </>
            )
          )}
        </div>
      </Modal>
    </>
  );
}