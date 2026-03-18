import { useState } from "react";
import { UseFormSetValue, UseFormReset } from "react-hook-form";
import Card from "../common/Card";
import Header from "@/app/components/common/Header";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import { LuX } from "react-icons/lu";

type LinkForm = {
  url: string | null;
  title: string | null;
  description: string | null;
  collection: string | null;
};

interface AddNewCollectionProps {
  setValue: UseFormSetValue<LinkForm>;
  reset: UseFormReset<LinkForm>;
  submit: () => void;
  setOpen: (open: boolean) => void;
  mode?: "add" | "edit";
  collectionId?: string;
  onClose?: () => void;
  currentValue?: string; // 👈 add this
}

export default function AddNewCollection({
  setValue,
  submit,
  setOpen,
  reset,
  mode = "add",
  onClose,
  currentValue = "", // 👈 add this
}: AddNewCollectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = mode === "edit";

  const handleClose = () => {
    reset();
    setOpen(false);
    onClose?.();
    setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="fixed z-50 inset-0 flex items-center justify-center"
    >
      <Card className="flex flex-col gap-3 w-full md:max-w-md">
        <LuX
          className="text-black hover:cursor-pointer"
          onClick={handleClose}
        />
        <Header
          title={isEditMode ? "Edit Collection" : "Add New Collection"}
          subtitle={
            isEditMode
              ? "Update your collection name"
              : "Create a new collection to organize your links"
          }
        />
        <TextInput
          label="COLLECTION NAME"
          placeholder="Enter collection name"
          value={currentValue} // 👈 controlled input
          onChange={(e) => setValue("collection", e.target.value)}
          required
        />
        <Button disabled={isSubmitting}>
          {isEditMode ? "Update Collection" : "Add Collection"}
        </Button>
      </Card>
    </form>
  );
}
