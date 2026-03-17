"use client";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

export default function FeaturesSection() {
  useScrollAnimation();
  return (
    <section id="features" className="py-12 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-16 text-center">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="scroll-animate bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-blue-400 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">🖼️</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Automatic Content Fetching
            </h3>
            <p className="text-gray-200 text-lg">
              We automatically fetch title, image and description.
            </p>
          </div>
          <div className="scroll-animate bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-purple-400 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">📂</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Smart Collections
            </h3>
            <p className="text-gray-200 text-lg">
              Group your content into collections.
            </p>
          </div>
          <div className="scroll-animate bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-pink-400 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">🏷️</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Intelligent Tagging
            </h3>
            <p className="text-gray-200 text-lg">
              Add tags to organize knowledge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
