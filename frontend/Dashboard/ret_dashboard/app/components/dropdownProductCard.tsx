"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // ShadCN dropdown component
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Removed AlertDialogTrigger
import { MoreVertical } from "lucide-react";

interface ProductMenuProps {
  onDelete: () => void;
  onEdit: () => void;
}

export const ProductMenu = ({ onDelete, onEdit }: ProductMenuProps) => {
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  return (
    <>
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Open product menu"
          >
            <MoreVertical className="text-gray-500 hover:text-gray-700" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem
            onSelect={() => setDialogType("edit")}
            className="flex items-center gap-2 cursor-pointer"
          >
            
           <img
            src="/images/editicon.svg" // Path to your edit icon image
            alt="Edit"
            className="w-10 h-10"
          />
            <span>Edit Product</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setDialogType("delete")}
            className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
          >
             <img
            src="/images/delete icon.svg" // Path to your delete icon image
            alt="Delete"
            className="w-10 h-10"
          />
            <span>Delete Product</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      Alert Dialog
      {dialogType && (
        <AlertDialog open={!!dialogType} onOpenChange={() => setDialogType(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {dialogType === "edit"
                  ? "Are you sure you want to edit this product?"
                  : "Are you sure you want to delete this product?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {dialogType === "edit"
                  ? "This action will take you to the edit page."
                  : "This action cannot be undone."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDialogType(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (dialogType === "edit") {
                    onEdit();
                  } else {
                    onDelete();
                  }
                  setDialogType(null);
                }}
              >
                {dialogType === "edit" ? "Yes, Edit" : "Yes, Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}; 