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
    <>
      <li className="nav-item">
        <Link href={href} className={`nav-link ${isActive ? "active" : ""}`}>
          <i className={`nav-icon ${icon}`} />
          <p>{label}</p>
        </Link>
      </li>
    </>
  );
};

export default SideBarItem;
