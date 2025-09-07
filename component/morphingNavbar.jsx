"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import Image from "next/image";

const MorphingNavigation = ({
  links = [],
  logo='/logo.png',
  scrollThreshold = 100,
  enablePageBlur = true,
  theme = "glass",
  backgroundColor,
  textColor,
  borderColor,
  initialTop = 70,
  compactTop = 20,
  animationDuration = 1,
  className,
  onLinkClick,
  onMenuToggle,
  enableSmoothTransitions = true,
  customHamburgerIcon,
  disableAutoMorph = false,
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const navRef = useRef(null);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1250);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getThemeStyles = useCallback(() => {
    switch (theme) {
      case "dark":
        return {
          nav: "bg-black/80 border-gray-800",
          text: "text-white",
          button: "bg-black/50 border-gray-700",
        };
      case "light":
        return {
          nav: "bg-white/80 border-gray-200",
          text: "text-gray-900",
          button: "bg-white/50 border-gray-300",
        };
      case "custom":
        return {
          nav: backgroundColor ? "" : "bg-white/5 border-white/10",
          text: textColor ? "" : "text-white",
          button: "bg-black/30 border-white/10",
        };
      case "glass":
      default:
        return {
          nav: "bg-white/5 border-white/10",
          text: "text-foreground",
          button: "bg-black/30 border-white/10",
        };
    }
  }, [theme, backgroundColor, textColor]);

  const themeStyles = getThemeStyles();

  useEffect(() => {
    if (disableAutoMorph && !isMobile && !isTablet) return;
    const handleScroll = () => {
      if (isMobile) {
        setIsSticky(true);
        setIsMenuOpen(false);
      } else {
        setIsSticky(window.scrollY >= scrollThreshold);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, disableAutoMorph, isMobile, isTablet]);

  const handleMenuToggle = () => {
    const open = !isMenuOpen;
    setIsMenuOpen(open);
    if (isMobile && open) {
      setIsSticky(true);
    } else if (isMobile && !open) {
      setIsSticky(window.scrollY >= scrollThreshold);
    } else {
      setIsSticky(false);
    }
    if (onMenuToggle) onMenuToggle(open);
  };

  const handleLinkClick = (link, e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (onLinkClick) onLinkClick(link);
    if (enableSmoothTransitions) {
      const target = document.querySelector(link.href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  const customStyles = {
    backgroundColor: theme === "custom" ? backgroundColor : undefined,
    color: theme === "custom" ? textColor : undefined,
    borderColor: theme === "custom" ? borderColor : undefined,
  };

  // Width logic
  const getNavWidth = () => {
    if (isMobile) return 300;
    if (isTablet) return isSticky ? 350 : 700;
    return isSticky ? 450 : 1200;
  };

  return (
    <>
      {/* Page blur when mobile menu open */}
      <AnimatePresence>
        {enablePageBlur && isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.header
        className={cn("fixed top-4 z-50 w-full", className)}
        initial={false}
        animate={{
          top: isMobile ? compactTop : isSticky ? compactTop : initialTop,
        }}
        transition={{ duration: animationDuration }}>
        <motion.nav
          ref={navRef}
          className={cn(
            "flex items-center justify-between px-6 mx-auto backdrop-blur-md border fixed",
            themeStyles.nav,
            themeStyles.text,
            {
              "left-1/2 -translate-x-1/2": !isMobile && !isSticky,
              "left-0 right-0": isMobile || isSticky,
            }
          )}
          animate={{
            height: isMobile ? 70 : isSticky ? 80 : 80,
            width: getNavWidth(),
            borderRadius: 9999,
          }}
          transition={{ duration: animationDuration }}
          style={{
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, 0.4), 0 6px 10px rgba(0, 0, 0, 0.3), 0 12px 20px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
            top: 20,
            ...customStyles,
          }}>
          {/* Left Logo */}
          <div className="flex items-center">
            <Image
              src={logo}
              alt="logo"
              height={1000}
              width={1000}
              className="h-7 w-45 md:h-8 md:w-50 lg:h-12 lg:w-80"
            />
          </div>

          {/* Right Menu Links */}
          <div className="flex items-center space-x-6">
            <AnimatePresence>
              {!isMobile &&
                !isSticky &&
                links.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link, e)}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-2 py-2 text-[15px] font-bold tracking-wide flex items-center">
                    {link.icon && (
                      <span className="mr-2 inline-block text-neutral-800 dark:text-neutral-800">{link.icon}</span>
                    )}
                    {link.label}
                  </motion.a>
                ))}
            </AnimatePresence>
          </div>

          {/* Hamburger (only for mobile/sticky) */}
          <motion.button
            onClick={handleMenuToggle}
            className={cn(
              "absolute right-4 w-[50px] h-[50px] rounded-full outline-none border cursor-pointer",
              themeStyles.button,
              {
                hidden: !isSticky && !isMobile,
                block: isMobile || isSticky,
              }
            )}
            animate={{ scale: isMobile || isSticky ? 1 : 0 }}
            transition={{ delay: isMobile || isSticky ? 0.2 : 0 }}>
            {customHamburgerIcon || (
              <div className="flex flex-col items-center justify-center h-full">
                <span className="block w-4 h-0.5 bg-current my-1"></span>
                <span className="block w-4 h-0.5 bg-current my-1"></span>
                <span className="block w-4 h-0.5 bg-current my-1"></span>
              </div>
            )}
          </motion.button>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu */}
      {/* Mobile Menu (only on mobile) */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}>
            <motion.div
              className={cn(
                "p-8 rounded-2xl backdrop-blur-md border w-11/12 max-w-sm",
                themeStyles.nav,
                themeStyles.text
              )}
              style={{
                boxShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.4), 0 6px 10px rgba(0, 0, 0, 0.3), 0 12px 20px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
                ...customStyles,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <div className="flex flex-col space-y-4">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link, e)}
                    className="font-bold text-lg tracking-wide hover:scale-105 transition-transform flex items-center">
                    {link.icon && (
                      <span className="inline-block mr-3">{link.icon}</span>
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MorphingNavigation;
