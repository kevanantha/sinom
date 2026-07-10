"use client"

import Image from "next/image"
import { catalogByCategory, type CatalogCategory } from "@/lib/catalog"
import {
  listSelectedItemIds,
  useWorkspaceStore,
} from "@/lib/workspace-store"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const CATEGORIES: { id: CatalogCategory; label: string }[] = [
  { id: "desks", label: "Desks" },
  { id: "chairs", label: "Chairs" },
  { id: "accessories", label: "Accessories" },
]

export function CatalogPanel() {
  const activeCategory = useWorkspaceStore((s) => s.activeCategory)
  const setActiveCategory = useWorkspaceStore((s) => s.setActiveCategory)
  const applyCatalogItem = useWorkspaceStore((s) => s.applyCatalogItem)
  const selection = useWorkspaceStore((s) => s.selection)
  const selectedIds = new Set(listSelectedItemIds(selection))
  const items = catalogByCategory(activeCategory)

  return (
    <aside className="flex h-full min-h-0 w-full flex-col gap-3 border-r border-border/80 bg-background/95 p-3 backdrop-blur md:w-[300px] lg:w-[320px]">
      <div className="flex flex-col gap-1 px-1">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Catalog
        </p>
        <h2 className="text-lg font-semibold tracking-tight">Build your setup</h2>
        <p className="text-xs text-muted-foreground">
          Tap an item to place it in the Room. Prices from monis.rent ($/week).
        </p>
      </div>

      <Tabs
        value={activeCategory}
        onValueChange={(v) => setActiveCategory(v as CatalogCategory)}
      >
        <TabsList className="w-full">
          {CATEGORIES.map((c) => (
            <TabsTrigger key={c.id} value={c.id} className="flex-1">
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-2 pr-1">
          {items.map((item) => {
            const active = selectedIds.has(item.id)
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => applyCatalogItem(item.id)}
                  className={cn(
                    "flex w-full gap-3 rounded-xl border p-2 text-left transition-colors",
                    active
                      ? "border-foreground bg-muted/60"
                      : "border-border hover:bg-muted/40"
                  )}
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                      unoptimized
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="line-clamp-2 text-sm leading-snug font-medium">
                        {item.name}
                      </span>
                      {active && (
                        <Badge variant="secondary" className="shrink-0">
                          In use
                        </Badge>
                      )}
                    </div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="text-sm font-semibold tabular-nums">
                      ${item.weeklyPriceUsd}
                      <span className="text-xs font-normal text-muted-foreground">
                        {" "}
                        /week
                      </span>
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
