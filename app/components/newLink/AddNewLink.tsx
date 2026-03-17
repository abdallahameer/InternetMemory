import { UseFormSetValue, UseFormReset } from "react-hook-form";
import Card from "../common/Card";
import Header from "@/app/components/common/Header";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import SelectInput from "../SelectInput";
import { LuX } from "react-icons/lu";

type LinkForm = {
  url: string | null;
  title: string | null;
  description: string | null;
  collection: string | null;
};

interface AddNewLinkProps {
  setValue: UseFormSetValue<LinkForm>;
  reset: UseFormReset<LinkForm>;
  submit: () => void;
  setOpen: (open: boolean) => void;
  collections: { id: string; name: string }[];
  mode?: "add" | "edit";
  linkId?: string;
  onClose?: () => void;
  currentUrl?: string;
  currentTitle?: string;
  currentDescription?: string;
  currentCollection?: string;
}

export default function AddNewLink({
  setValue,
  submit,
  setOpen,
  reset,
  collections,
  mode = "add",
  onClose,
  currentUrl = "",
  currentTitle = "",
  currentDescription = "",
  currentCollection = "",
}: AddNewLinkProps) {
  const isEditMode = mode === "edit";
  const title = isEditMode ? "Edit Link" : "Add New Link";
  const subtitle = isEditMode
    ? "Update link details"
    : "Save a link to your library";
  const buttonText = isEditMode ? "Update Link" : "Save Link";

  const handleClose = () => {
    reset();
    setOpen(false);
    onClose?.();
  };

  return (
    <form
      onSubmit={submit}
      className="fixed z-50 inset-0 flex items-center justify-center bg-black/50"
    >
      <Card className="flex flex-col gap-3 w-full max-w-md">
        <LuX
          className="text-black hover:cursor-pointer"
          onClick={handleClose}
        />
        <Header title={title} subtitle={subtitle} />

        <TextInput
          label="URL"
          placeholder="https://..."
          value={currentUrl}
          onChange={(e) => setValue("url", e.target.value)}
          required
        />
        <TextInput
          label="TITLE"
          placeholder="Give it a title"
          value={currentTitle}
          onChange={(e) => setValue("title", e.target.value)}
        />
        <TextInput
          label="DESCRIPTION"
          placeholder="Optional description"
          value={currentDescription}
          onChange={(e) => setValue("description", e.target.value)}
        />

        <SelectInput
          label="COLLECTION"
          options={collections}
          placeholder="Pick a collection..."
          defaultValue={currentCollection}
          onChange={(selected) =>
            setValue("collection", selected?.name || null)
          }
        />

        <Button>{buttonText}</Button>
      </Card>
    </form>
  );
}
