import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarItem = ({ href, icon, label }) => {
  const pathname = usePathname();
  const arrayHref = pathname.split("/");
  let isActive = pathname === href;

  if (arrayHref.length > 2) {
    isActive = "/" + arrayHref[1] === href;
  }

  return (
    <li className={`sidebar-item `}>
      <Link
        className={`sidebar-link ${isActive ? "active" : ""}`}
        href={href}
        id="get-url"
        aria-expanded="false"
      >
        <iconify-icon icon={icon} />
        <span className="hide-menu">{label}</span>
      </Link>
    </li>
  );
};

export default SideBarItem;
