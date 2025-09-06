"use client";

import { useEffect, useState } from "react";

export default function useResponsiveSize() {
  const [size, setSize] = useState({ width: 100, height: 100, distance: 120 });

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        // mobile
        setSize({ width: 150, height: 150, distance: 130 });
      } else if (screenWidth < 1024) {
        // tablet
        setSize({ width: 250, height: 250, distance: 250 });
      } else {
        // desktop
        setSize({ width: 400, height: 400, distance: 400 });
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
