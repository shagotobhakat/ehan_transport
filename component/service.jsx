"use client";
import { SeasonalHoverCards } from "./seasonalCard";
import { motion } from "motion/react";

export default function Service() {
  return (
    <div id="service" className=" mt-10 mb-20">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="text-center p-10 text-[28px] md:text-[50px] lg:text-[50px] font-bold text-neutral-800 dark:text-neutral-800">
        Service We Provide
      </motion.h1>
      <SeasonalHoverCards
        cards={[
          {
            title: "Truck Rental",
            description:
              "Affordable and reliable truck rentals for safe, on-time deliveries and hassle-free transport.",
            imageSrc: "/service1.jpg",
          },
          {
            title: "Goods Transport",
            description:
              "Fast and secure goods transport solutions to ensure your cargo reaches its destination safely and on time.",
            imageSrc: "/service2.jpg",
          },
          {
            title: "Corporate Delivery Contracts",
            description:
              "Reliable long-term delivery solutions tailored for businesses, ensuring consistency, safety, and on-time service.",
            imageSrc: "/service3.jpg",
          },
        ]}
      />
    </div>
  );
}
