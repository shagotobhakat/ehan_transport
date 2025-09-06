"use client";

import React, { useRef, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  easeOut,
} from "framer-motion";
import { cn } from "../lib/utils";

export function Draggable3DImageRing({
  images,
  width,
  height,
  perspective = 2000,
  imageDistance,
  initialRotation = 180,
  animationDuration = 1.5,
  staggerDelay = 0.1,
  autoplay = true,
  autoplaySpeed = 0.02,
  containerClassName,
  ringClassName,
  imageClassName,
  draggable = true,
}) {
  const ringRef = useRef(null);
  const rotationY = useMotionValue(initialRotation);
  const startX = useRef(0);
  const currentRotationY = useRef(initialRotation);
  const isDragging = useRef(false);
  const velocity = useRef(0);
  const autoplayRef = useRef(null);

  const angle = useMemo(() => 360 / images.length, [images.length]);

  useEffect(() => {
    const unsubscribe = rotationY.on("change", (latestRotation) => {
      currentRotationY.current = latestRotation;
    });
    return () => unsubscribe();
  }, [rotationY]);

  useEffect(() => {
    if (!autoplay) return;
    autoplayRef.current = setInterval(() => {
      rotationY.set(currentRotationY.current + autoplaySpeed * 360);
    }, 30);
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, autoplaySpeed, rotationY]);

  const handleDragStart = (event) => {
    if (!draggable) return;
    isDragging.current = true;
    clearInterval(autoplayRef.current);
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    if (ringRef.current) ringRef.current.style.cursor = "grabbing";
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (event) => {
    if (!isDragging.current) return;
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX.current;
    velocity.current = -deltaX * 0.5;
    rotationY.set(currentRotationY.current + velocity.current);
    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (ringRef.current) {
      ringRef.current.style.cursor = "grab";
      currentRotationY.current = rotationY.get();
    }
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const target = initial + velocity.current * 15;

    animate(initial, target, {
      type: "inertia",
      velocity: velocity.current * 20,
      power: 0.8,
      timeConstant: 300,
      restDelta: 0.5,
      modifyTarget: (target) => Math.round(target / angle) * angle,
      onUpdate: (latest) => rotationY.set(latest),
      onComplete: () => {
        if (autoplay) {
          autoplayRef.current = setInterval(() => {
            rotationY.set(currentRotationY.current + autoplaySpeed * 360);
          }, 30);
        }
      },
    });

    velocity.current = 0;
  };

  const imageVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      className={cn(
        "relative select-none flex items-center justify-center",
        containerClassName
      )}
      style={{ width: `${width * 2}px`, height: `${height * 2}px` }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}>
      <div
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${height}px`,
          position: "relative",
        }}>
        <motion.div
          ref={ringRef}
          className={cn("absolute w-full h-full", ringClassName)}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: "grab",
          }}>
          <AnimatePresence>
            {images.map((item, index) => (
              <motion.div
                key={index}
                className={cn(
                  "absolute flex items-center justify-center rounded-xl shadow-lg bg-white p-4",
                  imageClassName
                )}
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  rotateY: index * -angle,
                  z: -imageDistance,
                  transformOrigin: `50% 50% ${imageDistance}px`,
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={imageVariants}
                transition={{
                  delay: index * staggerDelay,
                  duration: animationDuration,
                  ease: easeOut,
                }}
                whileHover={{
                  scale: 1.08,
                  transition: { duration: 0.15 },
                }}>
                <a
                  href={item.href}
                  target={item.target || "_self"}
                  rel={
                    item.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                  className="w-full h-full flex">
                  <img
                    src={item.src}
                    alt={`carousel-img-${index}`}
                    className="w-full h-full object-contain"
                  />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
