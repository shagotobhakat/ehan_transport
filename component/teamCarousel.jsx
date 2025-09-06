"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icon package

const TeamCarousel = ({
  members = [],
  background,
  cardRadius = 20,
  animationDuration = 800,
  autoPlay = 3000,
  pauseOnHover = true,
  visibleCards = 2,
  sideCardScale = 0.9,
  sideCardOpacity = 0.8,
  grayscaleEffect = true,
  className,
  cardClassName,
  infoTextColor = "rgb(8, 42, 123)",
  initialIndex = 0,
  fitMode = "cover",
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  const totalMembers = members.length;

  // ✅ Change slide manually
  const paginate = useCallback(
    (newDirection) => {
      if (!totalMembers) return;
      setDirection(newDirection);
      setCurrentIndex(
        (prev) => (prev + newDirection + totalMembers) % totalMembers
      );
    },
    [totalMembers]
  );

  const calculatePosition = (index) => {
    if (!totalMembers) return "hidden";
    const activeIndex = currentIndex;
    const diff = (index - activeIndex + totalMembers) % totalMembers;

    if (diff === 0) return "center";
    if (diff <= visibleCards) return `right-${diff}`;
    if (diff >= totalMembers - visibleCards)
      return `left-${totalMembers - diff}`;
    return "hidden";
  };

  const getVariantStyles = (position, cardWidth) => {
    const transition = {
      duration: animationDuration / 1000,
      ease: [0.25, 0.46, 0.45, 0.94],
    };

    switch (position) {
      case "center":
        return {
          zIndex: 10,
          opacity: 1,
          scale: 1.05,
          x: 0,
          filter: "grayscale(0%)",
          transition,
        };
      case "right-1":
        return {
          zIndex: 5,
          opacity: sideCardOpacity,
          scale: sideCardScale,
          x: cardWidth * 0.6,
          filter: grayscaleEffect ? "grayscale(100%)" : "none",
          transition,
        };
      case "right-2":
        return {
          zIndex: 3,
          opacity: sideCardOpacity * 0.7,
          scale: sideCardScale * 0.85,
          x: cardWidth * 1.2,
          filter: grayscaleEffect ? "grayscale(100%)" : "none",
          transition,
        };
      case "left-1":
        return {
          zIndex: 5,
          opacity: sideCardOpacity,
          scale: sideCardScale,
          x: -cardWidth * 0.6,
          filter: grayscaleEffect ? "grayscale(100%)" : "none",
          transition,
        };
      case "left-2":
        return {
          zIndex: 3,
          opacity: sideCardOpacity * 0.7,
          scale: sideCardScale * 0.85,
          x: -cardWidth * 1.2,
          filter: grayscaleEffect ? "grayscale(100%)" : "none",
          transition,
        };
      default:
        return {
          zIndex: 0,
          opacity: 0,
          scale: 0.8,
          x: 0,
          pointerEvents: "none",
          filter: grayscaleEffect ? "grayscale(100%)" : "none",
          transition,
        };
    }
  };

  // ✅ Auto-play with IntersectionObserver
  useEffect(() => {
    if (!autoPlay || totalMembers === 0) return;

    let interval;
    const startAutoplay = () => {
      if (!interval) {
        interval = setInterval(() => paginate(1), autoPlay);
      }
    };
    const stopAutoplay = () => {
      clearInterval(interval);
      interval = null;
    };

    if (isVisible) startAutoplay();

    if (pauseOnHover && containerRef.current) {
      const pause = () => stopAutoplay();
      const resume = () => startAutoplay();
      containerRef.current.addEventListener("mouseenter", pause);
      containerRef.current.addEventListener("mouseleave", resume);

      return () => {
        stopAutoplay();
        // containerRef.current.removeEventListener("mouseenter", pause);
        // containerRef.current.removeEventListener("mouseleave", resume);
      };
    }

    return () => stopAutoplay();
  }, [autoPlay, paginate, pauseOnHover, totalMembers, isVisible]);

  // ✅ Pause autoplay when not visible
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="help" className="overflow-hidden">
      <div
        ref={containerRef}
        id="team-carousel-container"
        className={cn(
          "min-h-screen flex flex-col items-center justify-center relative",
          className
        )}
        style={{ background }}>
        <div
          className="w-full max-w-6xl relative mt-0 px-4"
          style={{ perspective: "1000px" }}>
          <div
            className="w-full h-full flex justify-center items-center relative"
            style={{ transformStyle: "preserve-3d" }}>
            <AnimatePresence initial={false} custom={direction}>
              {members.map((member, index) => {
                const position = calculatePosition(index);
                if (position === "hidden") return null;

                const cardWidth =
                  typeof window !== "undefined" && window.innerWidth < 640
                    ? 220
                    : 280;
                const cardHeight =
                  typeof window !== "undefined" && window.innerWidth < 640
                    ? 300
                    : 380;

                return (
                  <motion.div
                    key={`${member.id}-${index}`}
                    className={cn(
                      "absolute bg-white overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.4),_0_6px_10px_rgba(0,0,0,0.3),_0_12px_20px_rgba(0,0,0,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.05)]",
                      cardClassName
                    )}
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      borderRadius: cardRadius,
                      top: "50%",
                      left: "50%",
                      marginLeft: -cardWidth / 2,
                      marginTop: -cardHeight / 2,
                    }}
                    initial={getVariantStyles("hidden", cardWidth)}
                    animate={getVariantStyles(position, cardWidth)}
                    exit={getVariantStyles("hidden", cardWidth)}>
                    <img
                      src={member.image}
                      alt={member.name || "Carousel Image"}
                      style={{
                        backgroundImage: `url(${member.image})`,
                        backgroundSize:
                          fitMode === "cover" ? "cover" : "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: cardWidth,
                        height: cardHeight,
                        borderRadius: cardRadius,
                      }}
                      className="absolute bg-black"
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ✅ Navigation arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full">
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full">
            <ChevronRight size={28} />
          </button>
        </div>

        {/* ✅ Info section */}
        {members[currentIndex] && (
          <motion.div
            key={`${members[currentIndex].id}-info-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-10 px-4">
            <h2
              className="text-2xl md:text-4xl font-bold mb-2"
              style={{ color: infoTextColor }}>
              {members[currentIndex].name}
            </h2>
            <p className="text-lg md:text-xl opacity-80">
              {members[currentIndex].role}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeamCarousel;
