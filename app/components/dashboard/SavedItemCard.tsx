"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Link } from "../../types";

interface SavedItemCardProps {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
  image: string;
  isLiked: boolean;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (link: Link) => void;
}

export default function SavedItemCard({
  id,
  url,
  title,
  description,
  date,
  image,
  isLiked,
  onLike,
  onDelete,
  onEdit,
}: SavedItemCardProps) {
  const router = useRouter();

  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition-all hover:shadow-lg hover:shadow-purple-500/20">
      {/* Image/Gradient */}
      <div
        className="h-40 relative group cursor-pointer flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600"
        onClick={() => router.push(url)}
      >
        {image ? (
          <Image
            width={300}
            height={160}
            className="w-full h-full overflow-hidden object-cover group-hover:scale-105 transition-transform"
            src={image}
            alt={title}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-slate-700 to-slate-800">
            <span className="text-4xl">🖼️</span>
            <p className="text-xs text-slate-400 mt-2">No image</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className=" flex flex-col h-full p-4 ">
        <div className="flex flex-col w-full ">
          <h3 className="font-bold text-base sm:text-lg mb-2 group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-4">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
          <span className="truncate">{date}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onLike(id)}
              className="ml-2 text-xl hover:cursor-pointer  transition-transform hover:scale-125"
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <p className="hover:text-slate-300 hover:cursor-pointer">⋮</p>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="bg-slate-800 text-white rounded-md p-2 shadow-lg">
                <DropdownMenu.Item
                  onClick={() => {
                    const link: Link = {
                      id,
                      url,
                      title,
                      description,
                      collection_id: null,
                      is_liked: isLiked,
                      created_at: date,
                      image,
                    };
                    onEdit?.(link);
                  }}
                  className="px-4 py-2 hover:bg-slate-700 rounded-md cursor-pointer"
                >
                  Edit
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => onDelete(id)}
                  className="px-4 py-2 hover:bg-slate-700 rounded-md cursor-pointer"
                >
                  Delete
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
