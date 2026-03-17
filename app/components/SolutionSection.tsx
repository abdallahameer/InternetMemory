"use client";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

export default function SolutionSection() {
  useScrollAnimation();
  return (
    <section className="py-12 sm:py-20 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 text-center">
          Your Second Brain For The Internet
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-white gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-16">
          <div className="scroll-animate bg-purple-500 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💾</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Save links, tweets, videos, and tools instantly.
            </h3>
          </div>
          <div className="scroll-animate bg-blue-500 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Search and find anything you saved instantly.
            </h3>
          </div>
          <div className="scroll-animate bg-pink-500 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Organize everything into smart collections.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
