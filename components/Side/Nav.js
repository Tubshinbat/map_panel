import Link from "next/link";
import SideBarItem from "./SideBarItem";

const Nav = () => {
  return (
    <nav
      className="sidebar-nav d-block"
      id="menu-right-mini-1"
      data-simplebar="true"
    >
      <ul className="sidebar-menu" id="sidebarnav">
        <li className="nav-small-cap">
          <span className="hide-menu">Хянах самбар</span>
        </li>
        <SideBarItem
          href="/dashboard"
          icon={"solar:atom-line-duotone"}
          label={`Хянах самбар`}
        />

        <li>
          <span className="sidebar-divider" />
        </li>
        <li className="nav-small-cap">
          <span className="hide-menu">Контент</span>
        </li>
        <SideBarItem
          href="/news"
          icon={"solar:file-text-line-duotone"}
          label={`Мэдээ мэдээлэл`}
        />
        <SideBarItem
          href="/places"
          icon={"material-symbols:map-outline"}
          label={`Газрууд`}
        />
      </ul>
    </nav>
  );
};

export default Nav;
