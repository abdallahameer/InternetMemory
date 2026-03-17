"use client";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

export default function ProblemSection() {
  useScrollAnimation();
  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 text-center">
          The Internet Is Full Of Great Things
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-16 text-center">
          But We Keep Losing Them
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="scroll-animate bg-purple-500 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📑</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Browser bookmarks become chaos.
            </h3>
          </div>
          <div className="scroll-animate bg-blue-500 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📌</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              You save tabs and forget them later.
            </h3>
          </div>
          <div className="scroll-animate bg-pink-500 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Great ideas disappear in seconds.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
