"use client";

interface TabFilterProps {
  onAddLink?: () => void;
}

export default function TabFilter({ onAddLink }: TabFilterProps) {
  return (
    <section className="px-8 py-6 border-b border-slate-800">
      <div className="flex items-center justify-end">
        <button
          onClick={onAddLink}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
        >
          + Add Link
        </button>
      </div>
    </section>
  );
}
