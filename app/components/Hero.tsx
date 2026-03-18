import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col gap-4 sm:gap-8 items-center justify-center px-4 py-12 sm:py-20 text-center min-h-screen sm:min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-6 mt-16">
        Save Anything From The Internet
        <br />
        <span className="text-white">In One Smart Place</span>
      </h1>

      <p className="text-base sm:text-lg text-gray-300 mb-4 max-w-2xl">
        Articles, videos, tools, tweets, ideas. Never lose anything you find
        online again.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-16 w-full sm:w-auto">
        <Link
          href="/login"
          className="hover:cursor-pointer bg-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-800 text-sm sm:text-base"
        >
          Get Started Now
        </Link>
      </div>
    </section>
  );
}
