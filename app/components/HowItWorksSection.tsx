"use client";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

export default function HowItWorksSection() {
  useScrollAnimation();
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-white">
          <div className="scroll-animate bg-purple-500 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 flex items-center justify-center mb-6 font-bold text-3xl">
              1
            </div>
            <h3 className="text-2xl font-bold mb-4">Paste a link</h3>
            <p className="text-lg">
              Share any link from the internet with just a click or paste it
              directly.
            </p>
          </div>
          <div className="scroll-animate bg-blue-500 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 flex items-center justify-center mb-6 font-bold text-3xl">
              2
            </div>
            <h3 className="text-2xl font-bold mb-4">We save the content</h3>
            <p className="text-lg">
              Automatically extract and save the metadata, images, and content
              from your links.
            </p>
          </div>
          <div className="scroll-animate bg-pink-500 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 flex items-center justify-center mb-6 font-bold text-3xl">
              3
            </div>
            <h3 className="text-2xl font-bold mb-4">Access it anytime</h3>
            <p className="text-lg">
              Find and revisit your saved content whenever you need it, all in
              one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
