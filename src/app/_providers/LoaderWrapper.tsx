// app/providers/LoaderWrapper.tsx (new client boundary)
"use client";
import { useEffect, useState } from "react";
import WelcomingLoader from "../_components/welcoming-loader/welcoming-loader";

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoader, setShowLoader] = useState<boolean | null>(null);

  useEffect(() => {
    // Check sessionStorage only client-side (safe after hydration)
    const hasShownLoader = sessionStorage.getItem("__welcoming-loader-shown");
    if (hasShownLoader) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  // Don't render anything until we've checked sessionStorage to avoid flash
  if (showLoader === null) {
    return null;
  }

  return showLoader ? (
    <WelcomingLoader onComplete={handleLoaderComplete} />
  ) : (
    <>{children}</>
  );
}
