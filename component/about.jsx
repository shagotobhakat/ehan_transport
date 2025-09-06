"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AboutCard from "./aboutCard";
import AboutText from "./aboutText";

export default function About() {
  return (
    <>
      <div id="about" className=" bg-neutral-800 dark:bg-neutral-800">
        <div
          className="grid grid-cols-1 z-50 place-items-center
        xl:grid-rows-1 xl:grid-cols-1
        md:grid-rows-1 md:grid-cols-1
        sm:grid-rows-1 sm:grid-cols-1
        min-[320px]:grid-rows-1 min-[320px]:grid-cols-1
        bg-neutral-800 dark:bg-neutral-800">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}>
            <AboutCard />
          </motion.div>
        </div>
        <div
          className="mt-30 grid grid-cols-2 gap-4 z-50 place-items-center
        xl:grid-rows-1 xl:grid-cols-2
        md:grid-rows-1 md:grid-cols-1
        sm:grid-rows-1 sm:grid-cols-1
        min-[320px]:grid-rows-1 min-[320px]:grid-cols-1
        bg-neutral-800 dark:bg-neutral-800">
          <div>
            <AboutText />
          </div>
          <div>
            <figure className="p-8">
              <div className="one">
                <Image
                  src="/about.jpg"
                  alt="about"
                  width={1000}
                  height={600}
                  draggable={false}
                  className="h-100 w-150 rounded-3xl object-cover object-center"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
