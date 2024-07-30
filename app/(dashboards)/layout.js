"use client";
import Head from "next/head";

import { useToggleContext } from "context/toglleContext";
import Script from "next/script";
import Header from "components/Generals/Header";
import Side from "components/Side/Side";

export default function RootLayout({ children }) {
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="/plugins/fontawesome-free/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
        />
        <link
          rel="stylesheet"
          href="/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"
        />
        <link
          rel="stylesheet"
          href="/plugins/icheck-bootstrap/icheck-bootstrap.min.css"
        />
        <link rel="stylesheet" href="/plugins/jqvmap/jqvmap.min.css" />
        <link rel="stylesheet" href="/assets/css/adminlte.min.css" />
        <link
          rel="stylesheet"
          href="/plugins/overlayScrollbars/css/OverlayScrollbars.min.css"
        />
        <link
          rel="stylesheet"
          href="/plugins/daterangepicker/daterangepicker.css"
        />
        <link
          rel="stylesheet"
          href="/plugins/summernote/summernote-bs4.min.css"
        />
      </head>
      <body class="hold-transition sidebar-mini layout-fixed">
        <div class="wrapper">
          <Header />
          <Side />
          <div className="content-wrapper">{children}</div>
        </div>
        <Script
          src="/plugins/jquery/jquery.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/plugins/jquery-ui/jquery-ui.min.js"
          strategy="beforeInteractive"
        />
        <Script id="jquery-ui-bridge" strategy="beforeInteractive">{`
          $.widget.bridge('uibutton', $.ui.button)
        `}</Script>
        <Script
          src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
        />
        <Script src="/plugins/chart.js/Chart.min.js" strategy="lazyOnload" />
        <Script src="/plugins/sparklines/sparkline.js" strategy="lazyOnload" />
        <Script
          src="/plugins/jqvmap/jquery.vmap.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/plugins/jqvmap/maps/jquery.vmap.usa.js"
          strategy="lazyOnload"
        />
        <Script
          src="/plugins/jquery-knob/jquery.knob.min.js"
          strategy="lazyOnload"
        />
        <Script src="/plugins/moment/moment.min.js" strategy="lazyOnload" />
        <Script
          src="/plugins/daterangepicker/daterangepicker.js"
          strategy="lazyOnload"
        />
        <Script
          src="/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/plugins/summernote/summernote-bs4.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"
          strategy="lazyOnload"
        />
        <Script src="/dist/js/adminlte.js" strategy="lazyOnload" />
        <Script src="/dist/js/pages/dashboard.js" strategy="lazyOnload" />
      </body>
    </>
  );
}
