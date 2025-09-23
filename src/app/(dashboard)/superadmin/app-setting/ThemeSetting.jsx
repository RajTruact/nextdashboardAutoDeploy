"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@/src/context/ThemeContext";

export default function ThemeCustomizationPage() {
  const { colors, updateColors, refreshTheme, isLoading } = useTheme();
  const [userRole, setUserRole] = useState("superAdmin");
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
      secondaryColor: "#8b5cf6",
      tertiaryColor: "#10b981",
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

  if (userRole !== "superAdmin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You don't have permission to customize the theme.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Theme Customization
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your application's color scheme. Changes are saved to the database and applied globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {colorVariables.map((color) => (
            <ColorPicker key={color.key} color={color} />
          ))}
        </div>

        <div className="flex flex-wrap gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <button
            onClick={saveTheme}
            disabled={isUpdating}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
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
            onClick={resetTheme}
            disabled={isUpdating}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            Reset to Default
          </button>

          <button
            onClick={refreshFromAPI}
            disabled={isUpdating}
            className="px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg font-medium transition-colors"
          >
            Refresh from API
          </button>

          {isSaved && (
            <div className="ml-auto flex items-center px-4 py-3 bg-green-50 text-green-700 rounded-lg border border-green-200 dark:bg-green-500/20 dark:text-green-400">
              ✅ Theme saved successfully!
            </div>
          )}
        </div>

        {/* Live Preview */}
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Live Preview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded transition-colors">
                Primary Button
              </button>
              <div className="p-4 bg-primary-50 dark:bg-primary-500/20 rounded">
                <p className="text-primary-700 dark:text-primary-300">Primary background</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded transition-colors">
                Secondary Button
              </button>
              <div className="p-4 bg-secondary-50 dark:bg-secondary-500/20 rounded">
                <p className="text-secondary-700 dark:text-secondary-300">Secondary background</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}