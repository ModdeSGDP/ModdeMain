"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Retailor from "./components/retailor";
import { orders } from "./data/orders"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname.startsWith("/auth");  // State to track authentication status
  const isBasePath = pathname.endsWith("/");

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

    if (authStatus && isBasePath) {
      router.push("/Dashboard")
    }
  }, [pathname, isAuthPage, isBasePath, router]);

  // Load the sample data into localStorage if not already loaded
  useEffect(() => {
    const localData = localStorage.getItem("orderData");
    if (!localData) {
      localStorage.setItem("orderData", JSON.stringify(orders));
    }
  }, [])

  return (
    <html lang="en">
      <body className={`flex !pointer-events-auto ${isAuthenticated ? "overflow-hidden" : ""}`}>
        {!isAuthPage ? (
          isAuthenticated ? (
            <>
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <div className="overflow-y-scroll h-screen flex-grow">
                <div className="flex flex-col w-full">
                  {/* Header */}
                  <div className="flex flex-column">
                    <div className="p-4">
                      <Retailor />
                    </div>

                    <div className="flex-grow">
                      <Header />
                    </div>
                  </div>

                  {/* Retailor Section */}

                  <main className="flex-grow p-4">{children}</main>

                  {/* Footer */}
                  <Footer />
                </div>
              </div>
            </>
          ) : null
        ) : (
          <main className="w-full">{children}</main>
        )
        }
      </body >
    </html >
  );
}