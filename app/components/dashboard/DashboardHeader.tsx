"use client";

interface DashboardHeaderProps {
  title?: string;
  onSearch: (query: string) => void;
}

export default function DashboardHeader({
  title = "Dashboard",
  onSearch,
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search your memory..."
              onChange={(e) => onSearch(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 w-64"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
