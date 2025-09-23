// app/api/theme/route.js
import { NextResponse } from "next/server";

// Simple in-memory storage (replace with database)
let themeConfig = {
  primaryColor: "#465fff",
  secondaryColor: "#ee46bc",
  tertiaryColor: "#91ff47",
  successColor: "#12b76a", // No Need
  errorColor: "#f04438", // No Need
  warningColor: "#f79009", // No Need
  updatedAt: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json(themeConfig);
}

export async function PUT(request) {
  try {
    const updates = await request.json();

    // Basic color validation
    const isValidHex = (color) =>
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);

    if (updates.primaryColor && !isValidHex(updates.primaryColor)) {
      return NextResponse.json(
        { error: "Invalid primary color format" },
        { status: 400 }
      );
    }

    if (updates.secondaryColor && !isValidHex(updates.secondaryColor)) {
      return NextResponse.json(
        { error: "Invalid secondary color format" },
        { status: 400 }
      );
    }

    // Update theme configuration
    themeConfig = {
      ...themeConfig,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(themeConfig);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update theme" },
      { status: 500 }
    );
  }
}

"use client";
import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [colors, setColors] = useState({
    primaryColor: "#465fff",
    secondaryColor: "#ee46bc",
    tertiaryColor: "#91ff47",
    successColor: "#12b76a", // No Need// No Need
    errorColor: "#f04438", // No Need
    warningColor: "#f79009", // No Need
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const savedTheme = localStorage.getItem("theme");
        const savedColors = localStorage.getItem("themeColors");
        const initialTheme = savedTheme || "light";

        // Try to get colors from API
        try {
          const response = await fetch(
            "https://first-test-10103020174.development.catalystappsail.com/theme"
          );
          if (response.ok) {
            const apiColors = await response.json();
            setColors((prev) => ({ ...prev, ...apiColors }));
            localStorage.setItem("themeColors", JSON.stringify(apiColors));
          } else if (savedColors) {
            setColors(JSON.parse(savedColors));
          }
        } catch (error) {
          console.log("Using default colors, API not available");
          if (savedColors) {
            setColors(JSON.parse(savedColors));
          }
        }

        setTheme(initialTheme);
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize theme:", error);
        setTheme("light");
        setIsInitialized(true);
      }
    };

    initializeTheme();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("theme", theme);

      // Apply theme class
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Apply color CSS variables
      applyColorVariables(colors);
    }
  }, [theme, colors, isInitialized]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const updateColors = async (newColors) => {
    const updatedColors = { ...colors, ...newColors };
    setColors(updatedColors);
    localStorage.setItem("themeColors", JSON.stringify(updatedColors));

    // Apply immediately
    applyColorVariables(updatedColors);

    // Send update to API
    try {
      await fetch(
        "https://first-test-10103020174.development.catalystappsail.com/theme",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedColors),
        }
      );
    } catch (error) {
      console.error("Failed to update theme colors:", error);
    }
  };

  const applyColorVariables = (colorObj) => {
    const root = document.documentElement;

    // Apply base colors
    root.style.setProperty("--color-brand-500", colorObj.primaryColor);
    root.style.setProperty("--color-theme-pink-500", colorObj.secondaryColor);
    root.style.setProperty("--color-success-500", colorObj.successColor);
    root.style.setProperty("--color-error-500", colorObj.errorColor);
    root.style.setProperty("--color-warning-500", colorObj.warningColor);

    // Generate and apply shades for primary color
    generateColorShades(colorObj.primaryColor, "brand");
    generateColorShades(colorObj.secondaryColor, "theme-pink");
  };

  const generateColorShades = (baseColor, colorName) => {
    const root = document.documentElement;
    const shades = generateShadesFromBase(baseColor);

    Object.keys(shades).forEach((shade) => {
      root.style.setProperty(`--color-${colorName}-${shade}`, shades[shade]);
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, colors, toggleTheme, updateColors, isInitialized }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Color shade generation functions
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function lightenColor(rgb, amount) {
  return {
    r: Math.min(255, rgb.r + Math.round(255 * amount)),
    g: Math.min(255, rgb.g + Math.round(255 * amount)),
    b: Math.min(255, rgb.b + Math.round(255 * amount)),
  };
}

function darkenColor(rgb, amount) {
  return {
    r: Math.max(0, rgb.r - Math.round(255 * amount)),
    g: Math.max(0, rgb.g - Math.round(255 * amount)),
    b: Math.max(0, rgb.b - Math.round(255 * amount)),
  };
}

function generateShadesFromBase(baseColor) {
  const baseRgb = hexToRgb(baseColor);
  if (!baseRgb) return {};

  return {
    25: rgbToHex(...Object.values(lightenColor(baseRgb, 0.9))),
    50: rgbToHex(...Object.values(lightenColor(baseRgb, 0.8))),
    100: rgbToHex(...Object.values(lightenColor(baseRgb, 0.6))),
    200: rgbToHex(...Object.values(lightenColor(baseRgb, 0.4))),
    300: rgbToHex(...Object.values(lightenColor(baseRgb, 0.2))),
    400: rgbToHex(...Object.values(lightenColor(baseRgb, 0.1))),
    500: baseColor,
    600: rgbToHex(...Object.values(darkenColor(baseRgb, 0.1))),
    700: rgbToHex(...Object.values(darkenColor(baseRgb, 0.2))),
    800: rgbToHex(...Object.values(darkenColor(baseRgb, 0.3))),
    900: rgbToHex(...Object.values(darkenColor(baseRgb, 0.4))),
    950: rgbToHex(...Object.values(darkenColor(baseRgb, 0.5))),
  };
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// app/super-admin/theme/page.js
"use client";
import { useState, useEffect } from "react";

export default function ThemeCustomizationPage() {
  const [userRole, setUserRole] = useState("superAdmin"); // This would come from your auth system
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#465fff",
    secondaryColor: "#ee46bc",
    tertiaryColor: "#91ff47",
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // API endpoint from your Catalyst app
  const API_URL =
    "https://first-test-10103020174.development.catalystappsail.com/theme";

  // Define the color variables that can be customized
  const colorVariables = [
    {
      name: "Primary Color",
      key: "primaryColor",
      value: "#465FFF",
      description: "Main brand color for primary actions and buttons",
    },
    {
      name: "Secondary Color",
      key: "secondaryColor",
      value: "#EE46BC",
      description: "Secondary accent color for highlights",
    },
    {
      name: "Tertiary Color",
      key: "tertiaryColor",
      value: "#91FF47",
      description: "Tertiary color for additional accents",
    },
  ];

  // Fetch theme settings from Catalyst API
  const fetchThemeSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Extract theme settings from the API response format
      if (data && data.length > 0 && data[0].Theme_Settings) {
        setThemeSettings(data[0].Theme_Settings);

        // Apply colors immediately
        applyColorsToDocument(data[0].Theme_Settings);
      }
    } catch (error) {
      console.error("Failed to fetch theme settings:", error);
      // Fallback to default colors
      applyColorsToDocument(themeSettings);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  // Save theme settings to Catalyst API
  const saveThemeSettings = async (settings) => {
    try {
      setIsLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Theme_Settings: settings,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Theme saved successfully:", result);
      return true;
    } catch (error) {
      console.error("Failed to save theme settings:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Apply colors to CSS variables
  const applyColorsToDocument = (colors) => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;

      // Apply base colors
      if (colors.primaryColor) {
        root.style.setProperty("--color-brand-500", colors.primaryColor);
        generateAndApplyShades(colors.primaryColor, "brand");
      }

      if (colors.secondaryColor) {
        root.style.setProperty("--color-theme-pink-500", colors.secondaryColor);
        generateAndApplyShades(colors.secondaryColor, "theme-pink");
      }

      if (colors.tertiaryColor) {
        root.style.setProperty("--color-success-500", colors.tertiaryColor);
        generateAndApplyShades(colors.tertiaryColor, "success");
      }
    }
  };

  // Generate color shades from base color
  const generateAndApplyShades = (baseColor, colorName) => {
    const root = document.documentElement;
    const shades = generateShadesFromBase(baseColor);

    Object.keys(shades).forEach((shade) => {
      root.style.setProperty(`--color-${colorName}-${shade}`, shades[shade]);
    });
  };

  // Initialize theme settings
  useEffect(() => {
    fetchThemeSettings();
  }, []);

  const handleColorChange = (key, value) => {
    const newSettings = { ...themeSettings, [key]: value };
    setThemeSettings(newSettings);

    // Apply changes immediately for preview
    applyColorsToDocument(newSettings);
  };

  const saveTheme = async () => {
    try {
      await saveThemeSettings(themeSettings);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      alert("Failed to save theme changes. Please try again.");
    }
  };

  const resetTheme = () => {
    const defaultSettings = {
      primaryColor: "#465fff",
      secondaryColor: "#ee46bc",
      tertiaryColor: "#91ff47",
    };

    setThemeSettings(defaultSettings);
    applyColorsToDocument(defaultSettings);

    // Also reset in the database
    saveThemeSettings(defaultSettings).catch(console.error);
  };

  const ColorPicker = ({ color }) => (
    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
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
      />
      <input
        type="text"
        value={themeSettings[color.key] || color.value}
        onChange={(e) => handleColorChange(color.key, e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter hex code"
      />
    </div>
  );

  // If not superAdmin, show access denied
  if (userRole !== "superAdmin") {
    return (
      <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
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

  if (!isInitialized || isLoading) {
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
    <div className="bg-gray-50 dark:bg-[#16181D] p-4 md:p-6 rounded-xl mt-2">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Theme Customization
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your application's color scheme. Changes are saved to the
            database and applied globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {colorVariables.map((color) => (
            <ColorPicker key={color.key} color={color} />
          ))}
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
              "Save to Database"
            )}
          </button>

          <button
            onClick={resetTheme}
            disabled={isLoading}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors flex items-center justify-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white disabled:cursor-not-allowed"
          >
            Reset to Default
          </button>

          {isSaved && (
            <div className="ml-auto flex items-center px-4 py-3 bg-success-50 text-success-700 rounded-lg border border-success-200 dark:bg-success-500/20 dark:text-success-400 dark:border-success-500/30">
              <svg
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
              </svg>
              Theme saved to database!
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
          <p className="text-sm text-blue-600 dark:text-blue-300">
            <span className="font-semibold">Note:</span> These theme settings
            are stored in your Catalyst database and will affect all users of
            the application.
          </p>
        </div>

        {/* Preview Section */}
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Live Preview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
                Primary Button
              </button>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  Card background
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-success-50 dark:bg-success-500/20 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-success-500"></div>
                <span className="text-success-700 dark:text-success-400 text-sm">
                  Success state
                </span>
              </div>

              <div className="p-3 border border-brand-200 bg-brand-50 dark:bg-brand-500/20 rounded-lg">
                <p className="text-brand-700 dark:text-brand-300">
                  Brand accent
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Color shade generation functions (same as before)
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function lightenColor(rgb, amount) {
  return {
    r: Math.min(255, rgb.r + Math.round(255 * amount)),
    g: Math.min(255, rgb.g + Math.round(255 * amount)),
    b: Math.min(255, rgb.b + Math.round(255 * amount)),
  };
}

function darkenColor(rgb, amount) {
  return {
    r: Math.max(0, rgb.r - Math.round(255 * amount)),
    g: Math.max(0, rgb.g - Math.round(255 * amount)),
    b: Math.max(0, rgb.b - Math.round(255 * amount)),
  };
}

function generateShadesFromBase(baseColor) {
  const baseRgb = hexToRgb(baseColor);
  if (!baseRgb) return {};

  return {
    25: rgbToHex(...Object.values(lightenColor(baseRgb, 0.9))),
    50: rgbToHex(...Object.values(lightenColor(baseRgb, 0.8))),
    100: rgbToHex(...Object.values(lightenColor(baseRgb, 0.6))),
    200: rgbToHex(...Object.values(lightenColor(baseRgb, 0.4))),
    300: rgbToHex(...Object.values(lightenColor(baseRgb, 0.2))),
    400: rgbToHex(...Object.values(lightenColor(baseRgb, 0.1))),
    500: baseColor,
    600: rgbToHex(...Object.values(darkenColor(baseRgb, 0.1))),
    700: rgbToHex(...Object.values(darkenColor(baseRgb, 0.2))),
    800: rgbToHex(...Object.values(darkenColor(baseRgb, 0.3))),
    900: rgbToHex(...Object.values(darkenColor(baseRgb, 0.4))),
    950: rgbToHex(...Object.values(darkenColor(baseRgb, 0.5))),
  };
}

// want when the application loads the the get api get the colors and change the theme accordingly and permanently when the user update the color code and make the update api call to update the color in db and when the page refesh a new theme will be visible to all 