"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirect after 2s (simulate loading)
    const timer = setTimeout(() => {
      router.push("/superadmin");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      {/* Logo or Icon */}
      <div className="relative">
        {/* <div className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" /> */}
         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-blue-500 font-bold text-lg">SA</span>
        </div>
      </div>

      {/* Text */}
      <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg font-medium animate-pulse">
        Redirecting to Super Admin Dashboard
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-2 mt-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-[progress_2s_linear_forwards]" />
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
