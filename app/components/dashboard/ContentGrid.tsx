"use client";

import SavedItemCard from "./SavedItemCard";

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

interface ContentGridProps {
  items: Link[];
  onLike: (linkId: string) => void;
  onDelete: (linkId: string) => void;
  onEdit?: (link: Link) => void;
}

export default function ContentGrid({
  items,
  onLike,
  onDelete,
  onEdit,
}: ContentGridProps) {
  return (
    <section className="px-8 py-8">
      <div className="grid grid-cols-3 gap-6">
        {items?.map((item) => (
          <SavedItemCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            date={item.created_at}
            image={item.url}
            item={item}
            onLike={onLike}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </section>
  );
}
