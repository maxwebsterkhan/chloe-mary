// app/providers/LoaderWrapper.tsx (new client boundary)
"use client";
import { useEffect, useState } from "react";
import WelcomingLoader from "../_components/welcoming-loader/welcoming-loader";

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Check sessionStorage only client-side (safe after hydration)
    if (sessionStorage.getItem("__welcoming-loader-shown")) {
      setShowLoader(false);
      return;
    }
    // Your GSAP animation logic here, then:
    sessionStorage.setItem("__welcoming-loader-shown", "true");
    setShowLoader(false);
  }, []);

  return showLoader ? <WelcomingLoader /> : <>{children}</>;
}
