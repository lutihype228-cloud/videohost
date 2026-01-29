"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UploadIcon, ArrowRightIcon } from "./Icons";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-9rem)] md:min-h-[calc(100vh-10rem)] flex items-center hero-gradient pt-20">
      <div className="container-xl py-12 md:py-20">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', var(--font-plus-jakarta), sans-serif" }}>
              Загружай и делись{" "}
              <span className="highlight">своими</span> файлами
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`transition-all duration-700 ease-out delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Современная платформа для моментального обмена медиа в высоком
              качестве.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            {/* Upload Button */}
            <Link
              href="/upload"
              className="inline-flex items-center gap-3 px-6 py-3.5 text-base font-semibold text-[#0e1520] bg-[#17b4a1] rounded-xl hover:bg-[#15a392] transition-all duration-300 btn-animate group"
            >
              <UploadIcon className="transition-transform duration-300 group-hover:scale-110" />
              Загрузить файл
            </Link>

            {/* View Feed Button */}
            <Link
              href="/feed"
              className="inline-flex items-center gap-3 px-6 py-3.5 text-base font-semibold text-white border-2 border-[#313948] bg-transparent rounded-xl hover:border-[#17b4a1] hover:text-[#17b4a1] transition-all duration-300 group"
            >
              Посмотреть ленту
              <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#17b4a1] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#5f6acb] opacity-5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
