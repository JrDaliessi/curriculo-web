import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amauri Daliessi | Analista de Desenvolvimento TI",
  description: "Currículo e portfólio de Amauri Daliessi Junior — sistemas, processos, integrações, qualidade e suporte.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
