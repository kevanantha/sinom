"use client"

import { useWorkspaceStore, type CameraView } from "@/lib/workspace-store"
import { cn } from "@/lib/utils"

const VIEWS: { id: CameraView; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "top", label: "Top" },
  { id: "side", label: "Side" },
]

export function CameraViewSwitcher() {
  const cameraView = useWorkspaceStore((s) => s.cameraView)
  const setCameraView = useWorkspaceStore((s) => s.setCameraView)

  return (
    <div className="pointer-events-auto absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-full border border-border/80 bg-background/90 p-1 shadow-sm backdrop-blur">
      {VIEWS.map((view) => (
        <button
          key={view.id}
          type="button"
          onClick={() => setCameraView(view.id)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            cameraView === view.id
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {view.label}
        </button>
      ))}
    </div>
  )
}
