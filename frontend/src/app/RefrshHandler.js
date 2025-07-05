"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RefreshHandler({ setIsAuthenticated }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      setIsAuthenticated(true);

      if (
        pathname === "/" ||
        pathname === "/components/login" ||
        pathname === "/components/register"
      ) {
        router.replace("/home");
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [pathname, router, setIsAuthenticated]);

  return null;
}
