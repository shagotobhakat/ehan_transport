"use client";
import { TypingText } from "./typingText";

export default function BannerText() {
  return (
    <TypingText
      delay={0.5}
      duration={2}
      fontWeight="font-bold"
      color="text-white"
      align="center"
      className="mb-4 text-[28px] md:text-[32px] lg:text-5xl">
      Reliable Truck Rental & Transport Services
    </TypingText>
  );
}
