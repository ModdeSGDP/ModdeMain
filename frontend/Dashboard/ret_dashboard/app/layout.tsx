import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Retailor from "./components/retailor";



export const metadata: Metadata = {
  title: "Modde",
  description: "Create by Modde Frontend Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const retailorData = {
    name: "Incarange",
    avatar: "/images/maleavatar.svg", // Adjust the path based on your project structure
    greeting: "Hi, Joel !",
  };





  return (
    <html lang="en">
      <body className="min-h-screen flex">
        {/* Sidebar */}
         <Sidebar /> 
      
         
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

           {/* Retailor Section */}
          <div className="absolute top-0 left-64  z-12 p-4 w-[calc(100%-18rem)]">
            <Retailor {...retailorData} />
          </div>


          <main className="flex-grow p-4">{children}</main>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
