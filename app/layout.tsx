import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/userContext";

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
  // const isAuthenticated = cookies().get("authjs.session-token");
  return (
    <SessionProvider refetchInterval={5 * 60 * 60} refetchOnWindowFocus={false} session={session}>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <Toaster />
              {/* <Navbar isAuthenticated={isAuthenticated} /> */}

              {children}
            </AuthProvider>
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </SessionProvider>
  );
}
