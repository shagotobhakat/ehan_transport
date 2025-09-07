"use client";
import OrbitCard from "./orbitCard";
import Image from "next/image";

export default function AboutCard() {
  return (
    <OrbitCard className="mt-20">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-white dark:text-white mb-1">
          Engr. Md. Saroar Alam
        </h2>
        <p className="text-xl text-white dark:text-white mb-4">
          Proprietor
        </p>
        <Image
          src="/pro.jpg"
          alt="about"
          width={500}
          height={100}
          draggable={false}
          className="h-60 w-60 lg:h-80 lg:w-80 rounded-3xl object-cover object-center"
        />
      </div>
    </OrbitCard>
  );
}
