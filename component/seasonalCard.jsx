"use client";
import React from "react";
import Image from "next/image";
import { cn } from "../lib/utils";

const SeasonCard = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-end p-6 w-full md:w-1/3 h-[350px] lg:h-[450px] rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:w-2/3",
        className
      )}
    >
      {/* Background Image */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="absolute inset-0 object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
          priority={true}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-300">No Image</div>
      )}

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-[#000000ba] transition duration-500 group-hover:bg-opacity-50"></div>

      {/* Title + Subtitle */}
      <div className="relative z-10 space-y-2 md:absolute sm:bottom-20 md:bottom-40 lg:bottom-25">
        <h2 className="text-xl lg:text-2xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-md text-gray-300">{subtitle}</p>}
      </div>

      {/* Description */}
      <div
        className={cn(
          "z-10 relative mt-4 text-md lg:text-xl text-white transition-all duration-500",
          "opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-6 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
        )}
      >
        <p>{description}</p>
      </div>
    </div>
  );
};

export function SeasonalHoverCards({ cards, className }) {
  return (
    <div
      className={cn(
        "flex flex-wrap md:flex-nowrap gap-4 w-full px-4",
        className
      )}
    >
      {cards.map((card, index) => (
        <SeasonCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          imageSrc={card.imageSrc}
          imageAlt={card.imageAlt}
        />
      ))}
    </div>
  );
}
