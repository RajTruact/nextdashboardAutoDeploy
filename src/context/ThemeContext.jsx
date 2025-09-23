"use client";
import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [colors, setColors] = useState({
    primaryColor: "#465fff",
    secondaryColor: "#ee46bc",
    successColor: "#12b76a",
    errorColor: "#f04438",
    warningColor: "#f79009",
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
          const response = await fetch("/api/theme");
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
      await fetch("/api/theme", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedColors),
      });
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
