"use client";

import React, { useEffect } from "react";

export default function LoadingCover() {
  useEffect(() => {
    // Disable scrolling when the component is mounted
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable scrolling when the component is unmounted
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col gap-5 items-center justify-center bg-black bg-opacity-70 z-50">
      <span className="global-loader"></span>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
