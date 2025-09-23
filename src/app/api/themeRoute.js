// app/api/theme/route.js
import { NextResponse } from "next/server";

// Simple in-memory storage (replace with database)
let themeConfig = {
  primaryColor: "#465fff",
  secondaryColor: "#ee46bc",
  tertiaryColor: "#91ff47",
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

