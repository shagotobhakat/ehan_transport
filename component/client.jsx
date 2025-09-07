"use client";

import { motion } from "framer-motion";
import Globe from "./globe";

export default function Client() {
  return (
    <div className="bg-neutral-800 dark:bg-neutral-800 pt-30 pb-0 lg:pb-30">
      <div
        className="grid grid-cols-3 gap-6 place-items-center
        xl:grid-rows-1 xl:grid-cols-3
        md:grid-rows-1 md:grid-cols-1
        sm:grid-rows-1 sm:grid-cols-1
        min-[320px]:grid-rows-1 min-[320px]:grid-cols-1 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}>
          <div className="parent">
            <div className="card">
              <div className="content-box">
                <h3 className="card-title">Fast & On-Time Delivery</h3>
                <p className="card-content">
                  We ensure your goods are delivered quickly and reliably,
                  always on schedule. With our efficient logistics and dedicated
                  team.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}>
          <div className="parent">
            <div className="card">
              <div className="content-box">
                <h3 className="card-title">GPS-Enabled Trucks</h3>
                <p className="card-content">
                  Our trucks are equipped with advanced GPS tracking, allowing
                  real-time monitoring for safe, efficient, and transparent
                  deliveries.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}>
          <div className="parent">
            <div className="card">
              <div className="content-box">
                <h3 className="card-title">24/7 Customer Support</h3>
                <p className="card-content">
                  Our dedicated team is available around the clock to assist you
                  with any questions or concerns, anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Globe
        className="z-30"
        dark={false}
        scale={1.1}
        diffuse={1.5}
        mapSamples={60000}
        mapBrightness={5}
        baseColor="#1E90FF"
        markerColor="#FF6347"
        glowColor="#00FFFF"
      />
    </div>
  );
}
