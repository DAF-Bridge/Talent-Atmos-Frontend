import type { Metadata } from "next";
import "./globals.css";
import { Prompt } from "next/font/google";
import NavigationBar from "@/components/layout/NavBar";
import BigFooter from "@/components/layout/BigFooter";

// Google font - Prompt
const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Adjust weights as necessary
  variable: "--font-prompt", // Add a CSS variable for Prompt font
});

export const metadata: Metadata = {
  title: "Talent Atmos",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${prompt.variable}`}>
        <NavigationBar/>
        {children}
        <BigFooter/>
      </body>
    </html>
  );
}
