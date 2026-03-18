"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher, usePost, usePatch, useDelete } from "../hooks/usePost";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsSection from "../components/dashboard/StatsSection";
import TabFilter from "../components/dashboard/TabFilter";
import ContentGrid from "../components/dashboard/ContentGrid";
import useSWR from "swr";
import AddNewLink from "../components/newLink/AddNewLink";
import { useForm } from "react-hook-form";
import AddNewCollection from "../components/newCollection/NewCollection";
import { toast } from "react-toastify";
import {
  Link,
  Collection,
  LinkForm,
  LinksData,
  CollectionsData,
} from "../types";

const API_ENDPOINTS = {
  LINKS: "/links",
  COLLECTIONS: "/collections",
  LOGOUT: "/auth/logout",
} as const;

export default function DashboardPage() {
  const router = useRouter();
  const { watch, setValue, handleSubmit, reset } = useForm<LinkForm>({
    defaultValues: {
      url: null,
      title: null,
      description: null,
      collection: null,
    },
  });

  const formValue = watch();
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [addNewLink, setAddNewLink] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [addCollection, setAddCollection] = useState(false);
  const [editingCollection, setEditingCollection] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { post: addLink } = usePost(API_ENDPOINTS.LINKS);
  const { post: postCollection } = usePost(API_ENDPOINTS.COLLECTIONS);
  const { post: signOut } = usePost(API_ENDPOINTS.LOGOUT);
  const { patch: Patch } = usePatch<void>();
  const { delete: Delete } = useDelete();

  const { data: links, mutate: mutateLinks } = useSWR<LinksData>(
    showFavorites
      ? `${API_ENDPOINTS.LINKS}?is_liked=true`
      : activeCollection
        ? `${API_ENDPOINTS.LINKS}?collection_id=${activeCollection}`
        : API_ENDPOINTS.LINKS,
    fetcher,
  );

  const { data: collections, mutate: mutateCollections } =
    useSWR<CollectionsData>(API_ENDPOINTS.COLLECTIONS, fetcher);

  const stats = [
    { label: "Saved Links", count: links?.links?.length ?? 0 },
    { label: "Collections", count: collections?.collections?.length ?? 0 },
    {
      label: "Favorites",
      count: links?.links?.filter((link) => link.is_liked)?.length ?? 0,
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut({});
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleAddNewLink = async () => {
    try {
      if (formValue.url && formValue.title) {
        if (editingLink) {
          await Patch(`${API_ENDPOINTS.LINKS}/${editingLink}`, formValue);
          toast.success("Link updated successfully");
        } else {
          await addLink(formValue);
          toast.success("Link added successfully");
        }
        setAddNewLink(false);
        setEditingLink(null);
        reset();
        mutateLinks();
      }
    } catch (err) {
      toast.error("Failed to save link");
      console.error(err);
    }
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link.id);
    setValue("url", link.url);
    setValue("title", link.title);
    setValue("description", link.description);
    setValue("collection", link.collections?.name ?? null);
    setAddNewLink(true);
  };

  const handleLike = async (linkId: string) => {
    try {
      await Patch(`${API_ENDPOINTS.LINKS}/${linkId}/like`, {});
      mutateLinks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    try {
      await Delete(`${API_ENDPOINTS.LINKS}/${linkId}`);
      mutateLinks();
      toast.success("Link deleted successfully");
    } catch (err) {
      toast.error("Failed to delete link");
      console.error(err);
    }
  };

  const handleAddNewCollection = async () => {
    try {
      if (formValue.collection) {
        if (editingCollection) {
          await Patch(`${API_ENDPOINTS.COLLECTIONS}/${editingCollection}`, {
            name: formValue.collection,
          });
          toast.success("Collection updated successfully");
        } else {
          await postCollection({ name: formValue.collection });
          toast.success("Collection added successfully");
        }
        setAddCollection(false);
        setEditingCollection(null);
        reset();
        mutateCollections();
      }
    } catch (err) {
      toast.error("Failed to save collection");
      console.error(err);
    }
  };

  const handleEditCollection = (collection: Collection) => {
    setEditingCollection(collection.id);
    setValue("collection", collection.name);
    setAddCollection(true);
  };

  const handleDeleteCollection = async (collectionId: string) => {
    try {
      await Delete(`${API_ENDPOINTS.COLLECTIONS}/${collectionId}`);
      mutateCollections();
      toast.success("Collection deleted successfully");
    } catch (err) {
      toast.error("Failed to delete collection");
      console.error(err);
    }
  };

  const filterLinksBySearch = (items: Link[], query: string): Link[] => {
    if (!items) return [];
    return items.filter(
      (link) =>
        link.title?.toLowerCase().includes(query.toLowerCase()) ||
        link.description?.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const handleSelectCollection = (id: string) => {
    setShowFavorites(false);
    setActiveCollection(id === activeCollection ? null : id);
  };

  const handleShowFavorites = () => {
    setActiveCollection(null);
    setShowFavorites(!showFavorites);
  };

  const filteredLinks = filterLinksBySearch(links?.links ?? [], searchQuery);

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed md:relative inset-y-0 left-0 z-50 transform transition-transform md:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <Sidebar
            collections={collections ?? { collections: [] }}
            onLogout={handleLogout}
            onAddCollection={() => setAddCollection(true)}
            activeCollection={activeCollection}
            showFavorites={showFavorites}
            onSelectCollection={handleSelectCollection}
            onShowFavorites={handleShowFavorites}
            deleteFunction={handleDeleteCollection}
            onEdit={handleEditCollection}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto w-full">
          <DashboardHeader
            onSearch={setSearchQuery}
            title="Dashboard"
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          />
          <StatsSection stats={stats} />
          <TabFilter onAddLink={() => setAddNewLink(true)} />
          <ContentGrid
            items={filteredLinks}
            onLike={handleLike}
            onDelete={handleDeleteLink}
            onEdit={handleEditLink}
          />
        </main>
      </div>

      {addNewLink && (
        <AddNewLink
          submit={handleSubmit(handleAddNewLink)}
          setValue={setValue}
          setOpen={setAddNewLink}
          reset={reset}
          mode={editingLink ? "edit" : "add"}
          linkId={editingLink || undefined}
          collections={collections?.collections ?? []}
          onClose={() => setEditingLink(null)}
          currentUrl={formValue.url || ""}
          currentTitle={formValue.title || ""}
          currentDescription={formValue.description || ""}
          currentCollection={formValue.collection || ""}
        />
      )}

      {addCollection && (
        <AddNewCollection
          submit={handleSubmit(handleAddNewCollection)}
          setValue={setValue}
          reset={reset}
          setOpen={setAddCollection}
          mode={editingCollection ? "edit" : "add"}
          collectionId={editingCollection || undefined}
          onClose={() => setEditingCollection(null)}
          currentValue={formValue.collection || ""}
        />
      )}
    </>
  );
}
