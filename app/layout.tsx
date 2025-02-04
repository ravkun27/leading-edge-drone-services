import "./globals.css";
import { Inter } from "next/font/google";
import { ModalProvider } from "./context/ModalContext";
import { Icon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SkyView Drones - Photography & Mapping Services",
  description:
    "Professional drone photography and mapping services for various industries.",
  Icon: "/images/logo.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
