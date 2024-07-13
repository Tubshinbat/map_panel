// CSS Styles
import "bootstrap/dist/css/bootstrap.css";
import "public/assets/css/styles.css";
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
      <body>
        <NotificationProvider>
          <AuthProvider>
            <ToggleProvider>
              {children}

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
      </body>
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js"></Script>
      <Script src="/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></Script>
      <Script
        src="/assets/libs/simplebar/dist/simplebar.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/js/theme/app.dark.init.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/js/theme/theme.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/js/theme/app.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="../assets/js/theme/sidebarmenu.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/libs/apexcharts/dist/apexcharts.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/js/dashboards/dashboard1.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/libs/fullcalendar/index.global.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/js/plugins/toastr-init.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/libs/fullcalendar/index.global.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/js/apps/calendar-init.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/js/vendor.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/libs/apexcharts/dist/apexcharts.min.js"
        strategy="afterInteractive"
      ></Script>
      <Script
        src="/assets/js/dashboards/dashboard3.js"
        strategy="afterInteractive"
      ></Script>
      <Script src="/assets/js/all.min.js" />
    </html>
  );
}
