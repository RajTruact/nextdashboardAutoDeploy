import { Outfit } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "../context/SidebarContext";
import { ThemeProvider } from "../context/ThemeContext";
import { ViewTransitions } from "next-view-transitions";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ViewTransitions>
        <body className={`${outfit.className} dark:bg-gray-900`}>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </body>
      </ViewTransitions>
    </html>
  );
}
