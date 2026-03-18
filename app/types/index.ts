export interface Link {
  id: string;
  url: string;
  title: string;
  description: string;
  collection_id: string | null;
  is_liked: boolean;
  created_at: string;
  image: string | null;
  collections?: { name: string };
}

export interface Collection {
  id: string;
  name: string;
  created_at: string;
}

export interface LinkForm {
  url: string | null;
  title: string | null;
  description: string | null;
  collection: string | null;
}

export interface LinksData {
  links: Link[];
}

export interface CollectionsData {
  collections: Collection[];
}
