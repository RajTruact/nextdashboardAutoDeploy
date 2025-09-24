"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/src/context/ThemeContext";

export default function ThemeCustomizationPage() {
  const { colors, updateColors, refreshTheme, isLoading } = useTheme();
  const [userRole, setUserRole] = useState("superAdmin"); // You can get this from your auth context
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    tertiaryColor: "#10b981",
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync local state with context
  useEffect(() => {
    setThemeSettings(colors);
  }, [colors]);

  const colorVariables = [
    {
      name: "Primary Color",
      key: "primaryColor",
      description: "Main brand color for primary actions and buttons",
    },
    {
      name: "Secondary Color",
      key: "secondaryColor",
      description: "Secondary accent color for highlights",
    },
    {
      name: "Tertiary Color",
      key: "tertiaryColor",
      description: "Tertiary color for additional accents",
    },
  ];

  const handleColorChange = (key, value) => {
    const newSettings = { ...themeSettings, [key]: value };
    setThemeSettings(newSettings);
  };

  const saveTheme = async () => {
    try {
      setIsUpdating(true);
      await updateColors(themeSettings);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save theme:", error);
      alert("Failed to save theme changes. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const resetTheme = async () => {
    const defaultSettings = {
      primaryColor: "#3b82f6",
      tertiaryColor: "#10b981",
      secondaryColor: "#8b5cf6",
    };

    setThemeSettings(defaultSettings);

    try {
      setIsUpdating(true);
      await updateColors(defaultSettings);
    } catch (error) {
      console.error("Failed to reset theme:", error);
      alert("Failed to reset theme. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const refreshFromAPI = async () => {
    try {
      setIsUpdating(true);
      await refreshTheme();
    } catch (error) {
      console.error("Failed to refresh theme:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const ColorPicker = ({ color }) => (
    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
            {color.name}
          </label>
          {color.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {color.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            {themeSettings[color.key]}
          </span>
          <div
            className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600"
            style={{ backgroundColor: themeSettings[color.key] }}
          ></div>
        </div>
      </div>

      <input
        type="color"
        value={themeSettings[color.key]}
        onChange={(e) => handleColorChange(color.key, e.target.value)}
        className="w-full h-10 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
      />
      <input
        type="text"
        value={themeSettings[color.key]}
        onChange={(e) => handleColorChange(color.key, e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter hex code"
      />
    </div>
  );

  // if (userRole !== "superAdmin") {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
  //       <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  //         <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
  //           Access Denied
  //         </h2>
  //         <p className="text-gray-600 dark:text-gray-300">
  //           You don't have permission to customize the theme.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className=" mx-auto">
        <div className="mb-8">
          <h1 className="text-md md:text-md font-bold text-gray-800 dark:text-white mb-2">
            Theme Customization
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Customize your application's color scheme. Changes are saved and
            applied globally to all users.
          </p>
        </div>

        {isLoading ? (
          <div className=" flex items-center justify-center bg-gray-50 dark:bg-gray-900 mt-4">
            <div className="w-full p-6 space-y-6">
              {/* Page title shimmer */}
              {/* <div className="h-6 w-1/3 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
              <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-600 animate-pulse"></div> */}

              {/* 3 color pickers shimmer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-gray-100 dark:bg-gray-800 p-6 space-y-4 animate-pulse"
                  >
                    <div className="h-4 w-1/2 rounded-md bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-3 w-2/3 rounded-md bg-gray-200 dark:bg-gray-600"></div>
                    <div className="h-10 w-full rounded-md bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-6 w-1/2 rounded-md bg-gray-200 dark:bg-gray-600"></div>
                  </div>
                ))}
              </div>

              {/* Buttons shimmer */}
              <div className="flex gap-4">
                <div className="h-10 w-40 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                <div className="h-10 w-40 rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {colorVariables.map((color) => (
                <ColorPicker key={color.key} color={color} />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <button
                onClick={saveTheme}
                disabled={isUpdating}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  "Save Theme"
                )}
              </button>
              <button
                onClick={refreshFromAPI}
                disabled={isUpdating}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                Refresh from API
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
