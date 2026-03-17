"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface Collection {
  id: string;
  name: string;
  created_at: string;
}

interface CollectionsData {
  collections: Collection[];
}

interface SidebarProps {
  collections: CollectionsData;
  onLogout: () => void;
  onAddCollection?: () => void;
  activeCollection: string | null;
  onSelectCollection: (id: string) => void;
  showFavorites: boolean;
  onShowFavorites: () => void;
  deleteFunction: (id: string) => void;
  onEdit?: (collection: Collection) => void;
}

export default function Sidebar({
  collections,
  onLogout,
  onAddCollection,
  onSelectCollection,
  activeCollection,
  showFavorites,
  onShowFavorites,
  deleteFunction,
  onEdit,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-lg font-bold">💾</span>
        </div>
        <h1 className="text-xl font-bold">InternetMemory</h1>
      </div>

      {/* Favorites */}
      <button
        onClick={onShowFavorites}
        className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
          showFavorites
            ? "bg-red-500/20 text-red-400"
            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
        }`}
      >
        <span>{showFavorites ? "❤️" : "🤍"}</span>
        Favorites
      </button>

      {/* Collections */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
          My Collections
        </h3>
        <div className="space-y-2">
          {collections?.collections?.map((col) => (
            <div className="flex justify-between" key={col.id}>
              <button
                onClick={() => onSelectCollection(col.id)}
                className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                  activeCollection === col.id
                    ? "bg-purple-600 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span className="mr-2">📁</span>
                {col.name}
              </button>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <button className="hover:text-slate-300 hover:cursor-pointer">
                    ⋮
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="bg-slate-800 text-white rounded-md p-2 shadow-lg">
                  <DropdownMenu.Item
                    onClick={() => onEdit?.(col)}
                    className="px-4 py-2 hover:bg-slate-700 rounded-md cursor-pointer"
                  >
                    Edit
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => deleteFunction(col.id)}
                    className="px-4 py-2 hover:bg-slate-700 rounded-md cursor-pointer"
                  >
                    Delete
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          ))}
        </div>
        <button
          onClick={onAddCollection}
          className="w-full mt-3 px-4 py-2 text-sm text-purple-400 hover:text-purple-300 font-medium"
        >
          + New Collection
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-slate-200"
      >
        Log Out
      </button>
    </aside>
  );
}
