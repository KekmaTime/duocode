import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DuoCode",
  description: "Duocode is a platform for programmers to engage in pair programming via video calls, enabling real-time collaboration,screen sharing, and code editing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <NextTopLoader/>
          <Header/>
            {children}
        </Provider>
      </body>
    </html>
  );
}

