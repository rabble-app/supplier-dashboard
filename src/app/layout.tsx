/** @format */

import { ReduxProvider } from "@/redux/provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import QueryProvider from "@/utils/QueryProvider";

import PublicRouteWrapper from "./PublicRouteWrapper";
import "./globals.scss";

const goshaSans = localFont({
  src: [
    { path: "../../public/fonts/PPGoshaSans-Bold.otf", weight: "700" },
    { path: "../../public/fonts/PPGoshaSans-Regular.otf", weight: "400" },
  ],
  variable: "--font-gosha",
});

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/Poppins-Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Poppins-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Rabble",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${goshaSans.variable} ${poppins.variable}`}>
        <QueryProvider>
          <ReduxProvider>
            <PublicRouteWrapper>{children}</PublicRouteWrapper>{" "}
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
