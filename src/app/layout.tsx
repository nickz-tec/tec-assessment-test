import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEC Assessment Test",
  description: "TEC Assessment Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={heebo.variable} lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
