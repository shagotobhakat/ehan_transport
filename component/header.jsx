"use client";

import MorphingNavigation from "./morphingNavbar";
import { Home, ShoppingBag, Info, HelpCircle } from "lucide-react";

export default function Header() {
  const handleNavigation = (link) => {
    console.log("Navigating to:", link.href);
  };

  return (
    <MorphingNavigation
      links={[
        { id: "home", label: "Home", href: "#home", icon: <Home size={14} /> },
        {
          id: "about",
          label: "About",
          href: "#about",
          icon: <ShoppingBag size={14} />,
        },
        {
          id: "service",
          label: "Service",
          href: "#service",
          icon: <Info size={14} />,
        },
        {
          id: "contact",
          label: "Contact",
          href: "#contact",
          icon: <HelpCircle size={14} />,
        },
      ]}
      theme="custom"
      backgroundColor="#fff"
      textColor="#262626"
      borderColor="rgba(59, 130, 246, 0.3)"
      scrollThreshold={150}
      animationDuration={1.5}
      enablePageBlur={true}
      onLinkClick={handleNavigation}
      onMenuToggle={(isOpen) => console.log("Menu:", isOpen)}
    />
  );
}
