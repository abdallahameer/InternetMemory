"use client";

interface DashboardHeaderProps {
  title?: string;
  onSearch: (query: string) => void;
  onMenuToggle?: () => void;
}

export default function DashboardHeader({
  title = "Dashboard",
  onSearch,
  onMenuToggle,
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            {onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="md:hidden flex flex-col gap-1.5 cursor-pointer"
              >
                <span className="w-5 h-0.5 bg-white"></span>
                <span className="w-5 h-0.5 bg-white"></span>
                <span className="w-5 h-0.5 bg-white"></span>
              </button>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch(e.target.value)}
              className="px-3 sm:px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 w-full sm:w-64 text-sm sm:text-base"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
