"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Link {
  id: string;
  url: string;
  title: string;
  description: string;
  collection_id: string | null;
  is_liked: boolean;
  created_at: string;
  collections?: { name: string };
}

interface SavedItemCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  onLike: (id: string) => void;
  item: Link;
  onDelete: (id: string) => void;
  onEdit?: (item: Link) => void;
}

export default function SavedItemCard({
  title,
  description,
  date,
  image,
  onLike,
  item,
  onDelete,
  onEdit,
}: SavedItemCardProps) {
  const router = useRouter();
  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition-all hover:shadow-lg hover:shadow-purple-500/20">
      {/* Image/Gradient */}
      <div
        className={`h-40 ${image} relative group cursor-pointer flex items-center justify-center`}
        onClick={() => router.push(item.url)}
      >
        <Image
          width={100}
          height={100}
          className="w-full h-full overflow-hidden object-cover group-hover:scale-105 transition-transform"
          src={image}
          alt={title}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm mb-4">{description}</p>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 text-xs text-slate-500">
          <span>{date}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onLike(item.id)}
              className="ml-2 text-xl hover:cursor-pointer  transition-transform hover:scale-125"
            >
              {item.is_liked ? "❤️" : "🤍"}
            </button>
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button className="hover:text-slate-300 hover:cursor-pointer">
                ⋮
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-slate-800 text-white rounded-md p-2 shadow-lg">
              <DropdownMenu.Item
                onClick={() => onEdit?.(item)}
                className="px-4 py-2 hover:bg-slate-700 rounded-md cursor-pointer"
              >
                Edit
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => onDelete(item.id)}
                className="px-4 py-2 hover:bg-slate-700 rounded-md cursor-pointer"
              >
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
}
