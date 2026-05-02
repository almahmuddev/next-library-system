import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/lib/theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Bookshelf — Digital Library",
  description:
    "Explore, discover, and borrow from a curated digital book collection.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="bookshelf-dark" suppressHydrationWarning>
      <body className="bg-base-100 text-base-content min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              className: "!bg-base-200 !text-base-content !border !border-base-300",
              success: {
                iconTheme: { primary: "#f59e0b", secondary: "#000" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#fff" },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
