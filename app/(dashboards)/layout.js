"use client";
import Header from "components/Header/Header";
import Side from "components/Side/Side";
import { useToggleContext } from "context/toglleContext";
import Script from "next/script";

export default function RootLayout({ children }) {
  const { side } = useToggleContext();

  return (
    <>
      <div id="main-wrapper" className={side ? "show-sidebar" : ""}>
        {children}
      </div>
    </>
  );
}
