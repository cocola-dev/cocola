import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/userContext";
import NextTopLoader from "nextjs-toploader";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Cocola",
  description: "get start your journey with cocola",
  keywords: [
    "Cocola",
    "ruru",
    "Cocola - Register",
    "Cocola - Login",
    "Cocola - Home",
    "Cocola - dev",
  ],
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider
      refetchInterval={5 * 60 * 60}
      refetchOnWindowFocus={false}
      session={session}
    >
      <html lang="en">
        <body>
          <ScrollArea className="h-screen">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AuthProvider>
                <NextTopLoader
                  color="#ffffff"
                  initialPosition={0.08}
                  crawlSpeed={200}
                  height={3}
                  crawl={true}
                  showSpinner={false}
                  easing="ease"
                  speed={200}
                  zIndex={1600}
                  showAtBottom={false}
                />
                <Toaster />
                <Navbar isAuthenticated={session} />
                {children}
                <Footer />
              </AuthProvider>
            </ThemeProvider>
            <SpeedInsights />
            <Analytics />
          </ScrollArea>
        </body>
      </html>
    </SessionProvider>
  );
}
