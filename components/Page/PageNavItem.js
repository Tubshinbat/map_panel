"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const PageNavItem = ({ label, link }) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <li className={`page-nav-item ${isActive ? "active" : ""}`}>
      <Link href={link}> {label}</Link>
    </li>
  );
};

export default PageNavItem;
