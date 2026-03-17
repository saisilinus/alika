"use client";

import { useState } from "react";
import DesignerEditor from "@/components/designer-editor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DesignerPage() {
  const [designData, setDesignData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleDesignSave = async (data: any) => {
    setIsSaving(true);
    try {
      // Save the design data to your database
      // You can create an API endpoint to handle this
      const response = await fetch("/api/campaigns/designs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          design: data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setDesignData(result);
        alert("Design saved successfully!");
      } else {
        throw new Error("Failed to save design");
      }
    } catch (error) {
      console.error("Error saving design:", error);
      alert("Failed to save design. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Campaign Designer
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Create and customize your campaign designs
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <DesignerEditor onDesignSave={handleDesignSave} />
        </div>

        {designData && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-lg font-semibold text-green-900 mb-2">
              Design Saved!
            </h2>
            <p className="text-green-700">
              Your design has been saved. You can now download it or create a new one.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
