"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export function TypingText({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  duration = 2,
  fontWeight = "font-bold",
  color = "text-white",
  align = "left",
  loop = false,
}) {
  const [textContent, setTextContent] = useState("");


  useEffect(() => {
    const extractText = (node) => {
      if (typeof node === "string" || typeof node === "number") {
        return node.toString();
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join("");
      }
      if (React.isValidElement(node) && node.props.children !== undefined) {
        return extractText(node.props.children);
      }
      return "";
    };

    setTextContent(extractText(children));
  }, [children]);

  const characters = textContent
    .split("")
    .map((char) => (char === " " ? "\u00A0" : char));

  const characterVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay + i * (duration / characters.length),
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <Component
      className={cn(
        "inline-flex",
        className,
        fontWeight,
        color,
        align === "center"
          ? "justify-center text-center"
          : align === "right"
          ? "justify-end text-right"
          : "justify-start text-left"
      )}>
      <motion.span
        className="inline-block"
        initial="hidden"
        animate="visible"
        aria-label={textContent}
        role="text">
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            variants={characterVariants}
            custom={index}
            initial="hidden"
            animate="visible">
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
