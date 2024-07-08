"use client";
import { useToggleContext } from "context/toglleContext";
import Link from "next/link";
import { useState } from "react";
import Nav from "./Nav";

const Side = () => {
  const { handleToggleSideMenu } = useToggleContext();
  const [open, setOpen] = useState("dashboard");

  return (
    <>
      {/*  Sidebar Start */}
      <aside className="side-mini-panel with-vertical">
        <div className="iconbar">
          <div className="mini-nav">
            <div className="brand-logo d-flex align-items-center justify-content-center">
              <a
                className="nav-link sidebartoggler"
                id="headerCollapse"
                onClick={handleToggleSideMenu}
              >
                <iconify-icon
                  icon="solar:hamburger-menu-line-duotone"
                  className="fs-7"
                />
              </a>
            </div>
            <ul className="mini-nav-ul" data-simplebar>
              <li
                className={
                  open == "dashboard"
                    ? "mini-nav-item" + " selected"
                    : "mini-nav-item"
                }
                id="mini-1"
              >
                <a
                  data-bs-toggle="tooltip"
                  data-bs-custom-className="custom-tooltip"
                  data-bs-placement="right"
                >
                  <iconify-icon
                    icon="solar:layers-line-duotone"
                    className="fs-7"
                  ></iconify-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebarmenu">
          <div className="brand-logo d-flex align-items-center nav-logo">
            <a href="/" className="text-nowrap logo-img">
              <img src="/assets/images/logo.png" alt="Logo" />
            </a>
          </div>

          <Nav />
        </div>
      </aside>
      {/*  Sidebar End */}
    </>
  );
};

export default Side;
