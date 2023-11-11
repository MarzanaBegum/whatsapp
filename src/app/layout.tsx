import type { Metadata } from "next";
import "./globals.css";
import GoogleAuthProvier from "@/components/GoogleAuthProvider";

export const metadata: Metadata = {
  title: "Whats App",
  description: "The real time chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body suppressHydrationWarning={true}>
        <GoogleAuthProvier>
          {children}
        </GoogleAuthProvier>
        <div id="photo-picker-element"></div>
      </body>
    </html>
  );
}
