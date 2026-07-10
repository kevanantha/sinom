"use client"

import { useState, useEffect } from "react"
import { CatalogPanel } from "@/components/workspace/catalog-panel"
import { TopBar } from "@/components/workspace/top-bar"
import { CameraViewSwitcher } from "@/components/workspace/camera-view-switcher"
import { CheckoutSheet } from "@/components/workspace/checkout-sheet"
import { Button } from "@/components/ui/button"
import { useWorkspaceStore } from "@/lib/workspace-store"
import { WorkspaceCanvas } from "@/components/workspace/preview/workspace-canvas"

export function WorkspaceApp() {
  const openCheckout = useWorkspaceStore((s) => s.openCheckout)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <TopBar />
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <div className="order-2 max-h-[42vh] min-h-0 md:order-1 md:max-h-none">
          <CatalogPanel />
        </div>
        <main className="relative order-1 min-h-0 flex-1 p-3 md:order-2 md:p-4">
          <div className="relative size-full">
            {mounted ? (
              <WorkspaceCanvas />
            ) : (
              <div className="flex size-full min-h-[320px] items-center justify-center rounded-xl bg-[#e8eef2] text-sm text-muted-foreground">
                Loading room…
              </div>
            )}
            <CameraViewSwitcher />
            <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center md:hidden">
              <p className="rounded-full bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                Drag to look around · switch Front / Top / Side
              </p>
            </div>
            <div className="absolute right-3 bottom-4 z-10 md:right-4">
              <Button
                size="lg"
                className="pointer-events-auto shadow-md"
                onClick={openCheckout}
              >
                Ready to rent?
              </Button>
            </div>
          </div>
        </main>
      </div>
      <CheckoutSheet />
    </div>
  )
}
