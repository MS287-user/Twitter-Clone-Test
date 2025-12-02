'use client';
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "../../../store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body>

        <Provider store={store}>
          <ProtectedRoute>
          {children}
        </ProtectedRoute>
        </Provider>
        

        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
