"use client";

import { useEffect, useState } from "react";
import { PageLoader } from "@/components/ui/page-loader";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLoader(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
