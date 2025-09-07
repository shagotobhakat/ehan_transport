"use client";

import AuroraShader from "./auroraShader";
import Image from "next/image";
import BannerText from "./bannerText";
import BannerPopover from "./bannerPopover";

export default function Banner() {
  return (
    <div id="home" >
      <div className="relative w-full h-[700px] p-5 md:p-10 overflow-hidden flex items-center justify-center">
        <Image
          src="/truck.jpg"
          fill
          alt="Truck"
          className="object-cover"
          priority
        />

        <AuroraShader
          colorStops={["#007FFF", "#f9ce18", "#007FFF"]}
          amplitude={1.0}
          blend={0.5}
          speed={1.0}
        />

        <div className="relative z-10 text-center text-white items-center">
          <BannerText />
          <p className="mb-6 text-xl md:text-xl lg:text-2xl text-center">
            Affordable, safe, and on-time delivery for your business or personal
            needs.
          </p>
          <BannerPopover />
        </div>
      </div>
    </div>
  );
}
