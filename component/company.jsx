"use client";

import React from "react";
import { Draggable3DImageRing } from "./ringCarousel";
import { motion } from "framer-motion";
import  useResponsiveSize  from "./useResponsiveSize";

export default function Company() {
  const images = [
    {
      src: "/perfectFT.png",
      href: "https://perfectfootwear.ltd/",
      target: "_blank",
    },
    { src: "/tashdid.png", href: "https://tashdid.com.bd/", target: "_blank" },
    {
      src: "/junaina.png",
      href: "https://junainatrading.llc/",
      target: "_blank",
    },
    {
      src: "/ehanPI.png",
      href: "https://www.ehanpackaging.com/",
      target: "_blank",
    },
    { src: "/muses.png", href: "https://themuses.net/", target: "_blank" },
  ];

  const { width, height, distance } = useResponsiveSize();

  return (
    <div className="w-full min-h-screen bg-neutral-800 flex flex-col items-center justify-center space-y-10">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="text-center text-[28px] md:text-[50px] font-bold text-white">
        Sister Concern
      </motion.h1>

      <Draggable3DImageRing
        images={images}
        width={width}
        height={height}
        imageDistance={distance}
        perspective={2500}
        animationDuration={2}
        staggerDelay={0.15}
        autoplay={true}
        autoplaySpeed={0.002}
      />
    </div>
  );
}
