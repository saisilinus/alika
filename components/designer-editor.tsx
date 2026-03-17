"use client";

import { useEffect, useRef } from "react";

interface DesignerEditorProps {
  onDesignSave?: (designData: any) => void;
  initialDesign?: any;
}

declare global {
  interface Window {
    FancyProductDesigner: any;
  }
}

export default function DesignerEditor({ onDesignSave, initialDesign }: DesignerEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    // Load CSS dynamically
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "/FancyProductDesigner.min.css";
    document.head.appendChild(linkElement);

    // Load Script dynamically
    const scriptElement = document.createElement("script");
    scriptElement.src = "/FancyProductDesigner.min.js";
    scriptElement.onload = () => {
      if (containerRef.current && window.FancyProductDesigner) {
        // Initialize the designer with basic configuration
        const fpdConfig = {
          // Add your configuration options here
          stage: {
            width: 800,
            height: 600,
            backgroundColor: "#ffffff",
          },
          // You can customize more options based on FancyProductDesigner documentation
        };

        try {
          // Create a new instance if the library is loaded
          // Note: The exact initialization depends on FancyProductDesigner's API
          editorRef.current = new window.FancyProductDesigner(
            containerRef.current,
            fpdConfig
          );
        } catch (error) {
          console.error("Error initializing FancyProductDesigner:", error);
        }
      }
    };
    document.body.appendChild(scriptElement);

    return () => {
      // Cleanup
      if (scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
      if (linkElement.parentNode) {
        linkElement.parentNode.removeChild(linkElement);
      }
    };
  }, []);

  const handleSaveDesign = () => {
    if (editorRef.current && onDesignSave) {
      // Get the design data from the editor
      // The exact method depends on FancyProductDesigner's API
      try {
        const designData = editorRef.current.getDesignData?.() || {};
        onDesignSave(designData);
      } catch (error) {
        console.error("Error saving design:", error);
      }
    }
  };

  const handleDownloadDesign = () => {
    if (editorRef.current) {
      try {
        // Download functionality - exact method depends on FancyProductDesigner
        editorRef.current.download?.();
      } catch (error) {
        console.error("Error downloading design:", error);
      }
    }
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="fpd-container"
        style={{
          width: "100%",
          minHeight: "600px",
          backgroundColor: "#f5f5f5",
        }}
      />

      <div className="flex justify-between mt-6 gap-4">
        <button
          onClick={handleSaveDesign}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save Design
        </button>
        <button
          onClick={handleDownloadDesign}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Download
        </button>
      </div>
    </div>
  );
}
