"use client";

import ScrollReveal from "./scrollReveal";

export default function AboutText() {
  return (
    <div className="p-6">
      <ScrollReveal
        enableBlur={true}
        baseOpacity={0.05}
        baseRotation={5}
        blurStrength={6}
        staggerDelay={0.1}
        springConfig={{
          damping: 15,
          stiffness: 200,
          mass: 0.5,
        }}>
        <h1 className="pb-5 text-5xl font-bold text-white dark:text-white leading-relaxed">
          About Us
        </h1>
        <p className="text-white text-[18px] font-medium leading-relaxed">
          With years of experience in the transportation industry, EHAN
          Transport Agency has become a trusted partner for truck rentals. Our
          mission is simple: to offer dependable vehicles, fair pricing, and
          outstanding customer service every time. Whether it’s a short trip
          across town or a long-distance haul, we’re here to make your rental
          experience smooth and worry-free. We believe renting a truck should be
          easy and convenient. That’s why at EHAN Transport Agency, we provide
          well-maintained vehicles, transparent pricing, and friendly service
          tailored to your needs. Our team is always ready to guide you in
          choosing the right truck—so you can focus on what matters most while
          we take care of the road ahead.
        </p>
      </ScrollReveal>
    </div>
  );
}
