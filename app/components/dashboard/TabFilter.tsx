"use client";

interface TabFilterProps {
  onAddLink?: () => void;
}

export default function TabFilter({ onAddLink }: TabFilterProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-slate-800">
      <div className="flex items-center justify-end">
        <button
          onClick={onAddLink}
          className="px-4 sm:px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors text-sm sm:text-base"
        >
          + Add Link
        </button>
      </div>
    </section>
  );
}
