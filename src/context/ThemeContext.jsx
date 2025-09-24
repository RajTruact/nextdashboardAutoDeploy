"use client";
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const ThemeContext = createContext(undefined);

// Catalyst API endpoints
const CATALYST_API = {
  get: "https://first-test-10103020174.development.catalystappsail.com/theme",
  update:
    "https://first-test-10103020174.development.catalystappsail.com/theme",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [colors, setColors] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    tertiaryColor: "#10b981",
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch theme from Catalyst API using Axios
  const fetchThemeFromAPI = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(CATALYST_API.get);

      const result = response.data;

      // Extract colors from Catalyst response format
      if (result && result.length > 0) {
        const themeData = result[0];
        const newColors = {
          primaryColor: themeData.primaryColor || "#3b82f6",
          secondaryColor: themeData.secondaryColor || "#8b5cf6",
          tertiaryColor: themeData.tertiaryColor || "#10b981",
        };

        setColors(newColors);
        applyColorVariables(newColors);
        localStorage.setItem("themeColors", JSON.stringify(newColors));

        return newColors;
      }
    } catch (error) {
      console.error("Failed to fetch theme from API:", error);
      // Use localStorage fallback
      const savedColors = localStorage.getItem("themeColors");
      if (savedColors) {
        const parsedColors = JSON.parse(savedColors);
        setColors(parsedColors);
        applyColorVariables(parsedColors);
        return parsedColors;
      }
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  // Update theme in Catalyst API using Axios
  const updateThemeInAPI = async (newColors) => {
    try {
      const response = await axios.patch(CATALYST_API.update, newColors);

      if (response.data) {
        console.log("Theme updated successfully in Catalyst");
        return true;
      }
    } catch (error) {
      console.error("Failed to update theme in API:", error);
      throw error;
    }
    return false;
  };

  // Apply CSS variables to document
  const applyColorVariables = (colorObj) => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;

      // Apply base colors
      if (colorObj.primaryColor) {
        root.style.setProperty("--color-primary-500", colorObj.primaryColor);
        generateAndApplyShades(colorObj.primaryColor, "primary");
      }

      if (colorObj.secondaryColor) {
        root.style.setProperty(
          "--color-secondary-500",
          colorObj.secondaryColor
        );
        generateAndApplyShades(colorObj.secondaryColor, "secondary");
      }

      if (colorObj.tertiaryColor) {
        root.style.setProperty("--color-tertiary-500", colorObj.tertiaryColor);
        generateAndApplyShades(colorObj.tertiaryColor, "tertiary");
      }
    }
  };

  // Generate and apply color shades
  const generateAndApplyShades = (baseColor, colorName) => {
    const root = document.documentElement;
    const shades = generateShadesFromBase(baseColor);

    Object.keys(shades).forEach((shade) => {
      root.style.setProperty(`--color-${colorName}-${shade}`, shades[shade]);
    });
  };

  // Initialize theme
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const savedTheme = localStorage.getItem("theme");
        const initialTheme = savedTheme || "light";

        // Fetch theme from API
        await fetchThemeFromAPI();

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

  // Apply theme when it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("theme", theme);

      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      applyColorVariables(colors);
    }
  }, [theme, colors, isInitialized]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const updateColors = async (newColors) => {
    try {
      const updatedColors = { ...colors, ...newColors };

      // Update local state immediately
      setColors(updatedColors);
      localStorage.setItem("themeColors", JSON.stringify(updatedColors));
      applyColorVariables(updatedColors);

      // Update in Catalyst API
      await updateThemeInAPI(updatedColors);
    } catch (error) {
      console.error("Failed to update theme colors:", error);
      throw error;
    }
  };

  const refreshTheme = async () => {
    return await fetchThemeFromAPI();
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        toggleTheme,
        updateColors,
        refreshTheme,
        isInitialized,
        isLoading,
      }}
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
