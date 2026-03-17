"use client";

import StatsCard from "./StatsCard";

interface Stat {
  label: string;
  count: number; // ✅ changed from string to number
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} label={stat.label} count={stat.count} />
        ))}
      </div>
    </section>
  );
}
