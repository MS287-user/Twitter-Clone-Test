"use client";
import "@/app/(Home)/globals.css"
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import PublicRoute from "@/components/PublicRoute";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <Provider store={store}>
          <PublicRoute>
            {children}
          </PublicRoute>
        </Provider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}