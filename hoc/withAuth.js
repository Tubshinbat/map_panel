"use client";
import { useAuthContext } from "context/authContext";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const withAuth = (WrappedComponent, redirectTo = "/dashboard") => {
  return (props) => {
    const pathname = usePathname();
    const router = useRouter();
    const { isLogin } = useAuthContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (mounted) {
        if (isLogin && pathname === "/") {
          router.push(redirectTo);
        } else if (!isLogin && pathname !== "/") {
          router.push("/");
        }
      }
    }, [isLogin, pathname, router, mounted]);

    if (!mounted) {
      return null;
    }

    return isLogin || pathname === "/" ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
