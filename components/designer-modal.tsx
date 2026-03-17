"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import DesignerEditor from "./designer-editor";

interface DesignerModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
  campaignName?: string;
}

export default function DesignerModal({
  isOpen,
  onClose,
  campaignId,
  campaignName,
}: DesignerModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDesign = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement save design API call
      // const response = await fetch('/api/campaigns/designs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     campaignId,
      //     design: designData
      //   })
      // });
      console.log("[v0] Design saved for campaign:", campaignId);
      onClose();
    } catch (error) {
      console.error("[v0] Error saving design:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0 border-0">
        <DialogHeader className="px-6 py-4 border-b bg-background">
          <div className="flex items-center justify-between w-full">
            <div>
              <DialogTitle className="text-2xl">Campaign Designer</DialogTitle>
              <DialogDescription className="mt-1">
                {campaignName && `Designing: ${campaignName}`}
              </DialogDescription>
            </div>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden bg-background">
          <DesignerEditor />
        </div>

        <div className="px-6 py-4 border-t bg-background flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveDesign}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Design"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
