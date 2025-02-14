"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Retailor from "./components/retailor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname.startsWith("/auth");

  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("authenticated") === "true";
    setIsAuthenticated(authStatus);

    // Redirect unauthenticated users trying to access protected pages
    if (!authStatus && !isAuthPage) {
      router.push("/auth/signup");
    }

    // Redirect authenticated users away from sign-in/sign-up pages
    if (authStatus && isAuthPage) {
      router.push("/Dashboard");
    }
  }, [pathname]);

  
  return (
    <html lang="en">
      <body className="min-h-screen flex">
        {!isAuthPage ? (
          isAuthenticated ? (
            <>
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header />

                {/* Retailor Section */}
                <div className="absolute top-0 left-64 z-12 p-4 w-[calc(100%-18rem)]">
                  <Retailor />
                </div>

                <main className="flex-grow p-4">{children}</main>

                {/* Footer */}
                <Footer />
              </div>
            </>
          ) : null
        ) : (
          <main className="w-full">{children}</main>
        )}
      </body>
    </html>
  );
}
