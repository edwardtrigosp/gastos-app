import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import ThemeRegistry from "@/components/theme-registry";
import "./globals.css";

export const metadata: Metadata = {
  title: "GastosApp - Control de Gastos Diarios",
  description: "Aplicación para el control y seguimiento de gastos diarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <body>
          <ThemeRegistry>{children}</ThemeRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
