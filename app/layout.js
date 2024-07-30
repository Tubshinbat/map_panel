// CSS Styles

import "styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "public/fonts/fontawesome/css/fontawesome.css";
import "public/fonts/fontawesome/css/brands.css";
import "public/fonts/fontawesome/css/solid.css";
//

import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

//Components
import Loader from "components/Generals/Loader";

//Context
import { AuthProvider } from "context/authContext";
import { ToggleProvider } from "context/toglleContext";
import { NotificationProvider } from "context/notificationContext";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html data-bs-theme="dark" lang="en">
      <NotificationProvider>
        <AuthProvider>
          <ToggleProvider>
            <body>{children}</body>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ToggleProvider>
        </AuthProvider>
      </NotificationProvider>
    </html>
  );
}
