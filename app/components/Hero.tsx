export default function Hero() {
  return (
    <section className="flex flex-col gap-8 items-center justify-center px-4 py-20 text-center h-screen">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
        Save Anything From The Internet
        <br />
        <span className="text-white">In One Smart Place</span>
      </h1>

      <p className="text-lg text-gray-300 mb-4 max-w-2xl">
        Articles, videos, tools, tweets, ideas. Never lose anything you find
        online again.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4 justify-center mb-16">
        <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800">
          Get Started Now
        </button>
      </div>
    </section>
  );
}
