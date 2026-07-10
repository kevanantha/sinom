"use client"

import { RENTAL_DURATIONS } from "@/lib/catalog"
import {
  periodQuoteUsd,
  useWorkspaceStore,
  weeklyQuoteUsd,
} from "@/lib/workspace-store"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TopBar() {
  const selection = useWorkspaceStore((s) => s.selection)
  const durationWeeks = useWorkspaceStore((s) => s.durationWeeks)
  const setDuration = useWorkspaceStore((s) => s.setDuration)
  const openCheckout = useWorkspaceStore((s) => s.openCheckout)

  const weekly = weeklyQuoteUsd(selection)
  const period = periodQuoteUsd(selection, durationWeeks)

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-background/90 px-4 py-3 backdrop-blur">
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-semibold tracking-tight">Sinom</h1>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Workspace Designer · concept for monis.rent
          </span>
        </div>
        <p className="text-xs text-muted-foreground sm:hidden">
          Concept for monis.rent
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Duration</span>
          <div className="flex gap-1 rounded-full border p-0.5">
            {RENTAL_DURATIONS.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setDuration(w)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-medium tabular-nums transition-colors",
                  durationWeeks === w
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {w}w
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end leading-tight">
          <span className="text-lg font-semibold tabular-nums">
            ${period}
            <span className="text-xs font-normal text-muted-foreground">
              {" "}
              / {durationWeeks} wk
            </span>
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            ${weekly}/week
          </span>
        </div>

        <Button onClick={openCheckout}>Summary</Button>
      </div>
    </header>
  )
}
