import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "HELLO WORLD",
  description: "Real Time Messaging Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    cyberCyan: '#4fdfff',
                    cyberMint: '#5df2c6',
                    cyberRed: '#a00000',
                    cyberRedHover: '#c00000',
                  }
                }
              }
            }
          `}
        </Script>
      </head>
      <body className="antialiased">
        <div className="relative w-screen h-screen">
          {/* BACKGROUND COMPONENT */}
          <div 
            className="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat brightness-[0.7] contrast-[1.1] z-0" 
          />
          {/* CONTENT OVER BACKGROUND */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
