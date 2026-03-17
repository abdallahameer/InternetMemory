"use client";

interface StatsCardProps {
  label: string;
  count: number;
}

export default function StatsCard({ label, count }: StatsCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <p className="text-4xl font-bold mt-2">{count}</p>
    </div>
  );
}
