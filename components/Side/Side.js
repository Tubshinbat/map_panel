"use client";
import { useToggleContext } from "context/toglleContext";
import Link from "next/link";
import { useState } from "react";
import UserBox from "./Userbox";
import Nav from "./Nav";
import SideBarItem from "./SideBarItem";

const Side = () => {
  const { handleToggleSideMenu } = useToggleContext();
  const [open, setOpen] = useState("dashboard");

  return (
    <>
      {/*  Sidebar Start */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" className="brand-link">
          <span className="brand-text font-weight-light">Админ удирдлага</span>
        </a>

        <div className="sidebar">
          <UserBox />
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              data-accordion="false"
            >
              <SideBarItem
                href="/dashboard"
                icon={"fa-solid fa-gauge-high"}
                label={`Хянах самбар`}
              />
              <li className="nav-header">КОНТЕНТУУД</li>
              <SideBarItem
                href="/news"
                icon={"fa-solid fa-newspaper"}
                label={`Мэдээ мэдээлэл`}
              />

              <SideBarItem
                href="/places"
                icon={"fa-solid fa-layer-group"}
                label={`Газрууд`}
              />

              <SideBarItem
                href="/city-province"
                icon={"fa-solid fa-layer-group"}
                label={`Хот / Аймаг`}
              />
              <SideBarItem
                href="/district"
                icon={"fa-solid fa-layer-group"}
                label={`Сум / Дүүрэг`}
              />
              <SideBarItem
                href="/khoroo"
                icon={"fa-solid fa-layer-group"}
                label={`Баг / Хороо`}
              />
              <SideBarItem
                href="/polygon"
                icon={"fa-solid fa-layer-group"}
                label={`Полигон`}
              />
              <SideBarItem
                href="/rooms"
                icon={"fa-solid fa-house-user"}
                label={`Өрөөнүүд`}
              />
              <li className="nav-header">ДАТА</li>
              <SideBarItem
                href="/plans"
                icon={"fa-regular fa-clipboard"}
                label={`Багц`}
              />
              <SideBarItem
                href="/rates"
                icon={"fa-solid fa-star-half-stroke"}
                label={`Үнэлгээнүүд`}
              />
              <SideBarItem
                href="/orders"
                icon={"fa-solid fa-boxes-stacked"}
                label={`Захиалга`}
              />

              <SideBarItem
                href="/users"
                icon={"fa-solid fa-users"}
                label={`Хэрэглэгчид`}
              />
              <li className="nav-header">ТОХИРГОО</li>
              <SideBarItem
                href="/web_settings"
                icon={"fa-solid fa-gear"}
                label={`Ерөнхий тохиргоо`}
              />
              <SideBarItem
                href="/paid_type"
                icon={"fa-solid fa-wallet"}
                label={`Төлбөрийн хэрэгсэл`}
              />
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
      {/*  Sidebar End */}
    </>
  );
};

export default Side;
