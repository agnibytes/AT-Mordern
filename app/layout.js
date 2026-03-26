import "./globals.css";
import CursorFollower from "@/components/CursorFollower";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata = {
  title: "Aaditya Tiwari | Portfolio",
  description: "High-end AI startup landing page with smooth animations and premium interactions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-sans selection:bg-purple-500/30">
        <div className="noise-overlay" />
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}
