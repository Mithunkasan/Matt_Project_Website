"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddWorkshopForm } from "../forms/AddWorkshopForm";
import { Workshop } from "@/types";

interface AddWorkshopDialogProps {
  onWorkshopAdded: (workshop: Workshop) => void;
}

export function AddWorkshopDialog({ onWorkshopAdded }: AddWorkshopDialogProps) {
  const [open, setOpen] = useState(false);

  const handleWorkshopAdded = (workshop: Workshop) => {
    onWorkshopAdded(workshop);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 text-white bg-[#15803d] hover:bg-[#0e4d25] h-10 px-1">
          <Plus className="h-4 w-4" />
          Add Workshop
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 bg-white rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Add New Workshop</DialogTitle>
        </DialogHeader>

        {/* Form container */}
        <div className="mt-4">
          <AddWorkshopForm
            onWorkshopAdded={(workshop) => {
              handleWorkshopAdded(workshop);
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}