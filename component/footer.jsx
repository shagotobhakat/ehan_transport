"use client";

import React from "react";
import BlurText from "./blurText";

export default function Footer() {
  return (
    <div id="contact" className="w-full bg-[#262626] py-10 px-5 lg:px-50">
      <div className="container">
        <BlurText
          text={`Head Office : Suite-4-5, Level-14, 177 Mahtab Center, Shah Nazrul Islam Sarani, Bijoynagar, Paltan, Dhaka-1000  Phone : +8802-58317410, 58317412 Cell : +88 01407-050600, 01678-139546`}
          delay={150}
          animateBy="words"
          direction="top"
          className="text-[18px] justify-center text-center text-white font-semibold"
          stepDuration={0.4}
        />
      </div>
    </div>
  );
}
