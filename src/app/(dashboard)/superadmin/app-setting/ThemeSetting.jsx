"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/src/context/ThemeContext";

export default function ThemeCustomizationPage() {
  const { colors, updateColors, isInitialized } = useTheme();
  const [userRole, setUserRole] = useState("superAdmin"); // This would come from your auth system
  const [themeSettings, setThemeSettings] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("brand");

  // Define the color variables that can be customized via API
  const apiColorVariables = [
    {
      name: "Primary Color",
      key: "primaryColor",
      var: "--color-brand-500",
      value: "#465FFF",
      category: "brand",
      description: "Main brand color for buttons, links, and primary actions",
    },
    {
      name: "Secondary Color",
      key: "secondaryColor",
      var: "--color-theme-pink-500",
      value: "#EE46BC",
      category: "brand",
      description:
        "Secondary accent color for highlights and secondary elements",
    },
  ];

  // Initialize theme settings from context
  useEffect(() => {
    if (isInitialized && colors) {
      setThemeSettings(colors);
    }
  }, [isInitialized, colors]);

  const handleColorChange = (key, value) => {
    const newSettings = { ...themeSettings, [key]: value };
    setThemeSettings(newSettings);

    // Apply changes immediately to the document for preview
    if (typeof window !== "undefined") {
      const variable = apiColorVariables.find((c) => c.key === key)?.var;
      if (variable) {
        document.documentElement.style.setProperty(variable, value);
      }
    }
  };

  const saveTheme = async () => {
    setIsLoading(true);
    try {
      await updateColors(themeSettings);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save theme:", error);
      alert("Failed to save theme changes");
    } finally {
      setIsLoading(false);
    }
  };

  const resetTheme = async () => {
    const defaultColors = {
      primaryColor: "#465fff",
      secondaryColor: "#ee46bc",
      successColor: "#12b76a",
      errorColor: "#f04438",
      warningColor: "#f79009",
    };

    setThemeSettings(defaultColors);

    // Reset CSS variables
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      apiColorVariables.forEach((color) => {
        root.style.setProperty(
          color.var,
          defaultColors[color.key] || color.value
        );
      });
    }

    // Save reset to API
    await updateColors(defaultColors);
  };

  const ColorPicker = ({ color, isApiControlled = true }) => (
    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
            {color.name}
            {isApiControlled && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-brand-100 text-brand-700 rounded dark:bg-brand-500/20 dark:text-brand-300">
                API
              </span>
            )}
          </label>
          {color.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {color.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            {themeSettings[color.key] || color.value}
          </span>
          <div
            className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 shadow-sm"
            style={{ backgroundColor: themeSettings[color.key] || color.value }}
          ></div>
        </div>
      </div>

      <input
        type="color"
        value={themeSettings[color.key] || color.value}
        onChange={(e) => handleColorChange(color.key, e.target.value)}
        className="w-full h-10 cursor-pointer rounded-md border border-gray-300 dark:border-gray-600"
        disabled={!isApiControlled}
      />
      <input
        type="text"
        value={themeSettings[color.key] || color.value}
        onChange={(e) => handleColorChange(color.key, e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter hex code"
        disabled={!isApiControlled}
      />
    </div>
  );

  // If not superAdmin, show access denied
  if (userRole !== "superAdmin") {
    return (
      <div className=" flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to customize the theme. Only superAdmins
            can access this feature.
          </p>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading theme settings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 dark:bg-[#16181D] p-4 md:p-6 rounded-xl mt-2">
      <div className=" mx-auto">
        <div className="mb-8">
          <h1 className="text-md md:text-xl font-bold text-gray-800 dark:text-white mb-2">
            Theme Customization
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Customize the application color scheme. Changes are applied
            immediately and saved to the database. All users will see these
            changes in real-time.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full">
            <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab("brand")}
                    className={`py-3 px-6 text-sm font-medium border-b-2 ${
                      activeTab === "brand"
                        ? "border-brand-500 text-brand-600 dark:text-brand-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    Brand Colors
                  </button>
                </nav>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeTab === "brand" &&
                    apiColorVariables
                      .filter((color) => color.category === "brand")
                      .map((color) => (
                        <ColorPicker
                          key={color.key}
                          color={color}
                          isApiControlled={true}
                        />
                      ))}

                  {activeTab === "functional" &&
                    apiColorVariables
                      .filter((color) => color.category === "functional")
                      .map((color) => (
                        <ColorPicker
                          key={color.key}
                          color={color}
                          isApiControlled={true}
                        />
                      ))}

                  {activeTab === "preview" && (
                    <>
                      {apiColorVariables.map((color) => (
                        <ColorPicker
                          key={color.key}
                          color={color}
                          isApiControlled={true}
                        />
                      ))}
                      {previewColorVariables.map((color) => (
                        <ColorPicker
                          key={color.key}
                          color={color}
                          isApiControlled={false}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <button
                onClick={saveTheme}
                disabled={isLoading}
                className="px-6 py-3 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    {/* <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg> */}
                    Save to Database
                  </>
                )}
              </button>

              <button
                onClick={resetTheme}
                disabled={isLoading}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors flex items-center justify-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white disabled:cursor-not-allowed"
              >
                {/* <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg> */}
                Reset to Default
              </button>

              {isSaved && (
                // <div className="ml-auto flex items-center px-4 py-3 bg-success-50 text-success-700 rounded-lg border border-success-200 dark:bg-success-500/20 dark:text-success-400 dark:border-success-500/30">
                //   <svg
                //     className="w-5 h-5 mr-2"
                //     fill="none"
                //     stroke="currentColor"
                //     viewBox="0 0 24 24"
                //   >
                //     <path
                //       strokeLinecap="round"
                //       strokeLinejoin="round"
                //       strokeWidth="2"
                //       d="M5 13l4 4L19 7"
                //     ></path>
                //   </svg>
                //   Theme saved to database!
                // </div>
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
          <p className="text-xs leading-normal text-blue-600 dark:text-blue-300">
            <span className="font-semibold">Note:</span> Changing these settings
            will affect how your application name appears throughout the system.
          </p>
        </div>
      </div>
    </div>
  );
}
